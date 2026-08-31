// Local development server for lettersunscrambler.com.
//
// The production site is served by the Cloudflare Worker in `worker.js`, which
// pulls page/asset bytes from GitHub raw and injects the "modern" CSS/JS
// overlay. To preview the site exactly as it renders in production, this script
// runs the real Worker in Node and:
//   - rewrites the request host to the canonical host so the Worker does not
//     301-redirect local requests to the live domain, and
//   - intercepts the Worker's outbound fetches to GitHub raw so that pages and
//     assets are read from the local working tree instead of the deployed repo.
//
// Usage: node dev-server.mjs [port]   (defaults to PORT env or 8787)

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, normalize } from "node:path";
import { Readable } from "node:stream";

const ROOT = dirname(fileURLToPath(import.meta.url));
const CANONICAL_HOST = "lettersunscrambler.com";
const PORT = Number(process.argv[2] || process.env.PORT || 8787);

// Serve a local file for any githubusercontent.com URL the Worker requests, and
// serve the local dictionary for the ENABLE dictionary URL.
const realFetch = globalThis.fetch;
globalThis.fetch = async (input, init) => {
  const urlStr = typeof input === "string" ? input : input.url;
  let u;
  try {
    u = new URL(urlStr);
  } catch {
    return realFetch(input, init);
  }

  if (u.hostname === "raw.githubusercontent.com") {
    // .../<owner>/<repo>/<ref>/<path...>  -> local <path...>
    const parts = u.pathname.split("/").filter(Boolean);
    const rel = parts.slice(3).join("/");
    // Fall back to the live dictionary for the ENABLE source file.
    if (rel.endsWith("enable1.txt")) {
      return serveLocalFile("words.txt");
    }
    return serveLocalFile(rel);
  }

  // Anything else (e.g. formsubmit, dictionary/Wikipedia lookups) goes to the network.
  return realFetch(input, init);
};

async function serveLocalFile(rel) {
  const safe = normalize(rel).replace(/^(\.\.[/\\])+/, "");
  const full = join(ROOT, safe);
  try {
    const buf = await readFile(full);
    return new Response(buf, { status: 200 });
  } catch {
    return new Response("not found", { status: 404 });
  }
}

const worker = (await import("./worker.js")).default;

const server = createServer(async (req, res) => {
  try {
    const incoming = new URL(req.url, `http://${CANONICAL_HOST}`);
    incoming.protocol = "https:";
    incoming.hostname = CANONICAL_HOST;
    incoming.port = "";

    const method = req.method || "GET";
    const hasBody = method !== "GET" && method !== "HEAD";
    const request = new Request(incoming.toString(), {
      method,
      headers: req.headers,
      body: hasBody ? await readRequestBody(req) : undefined,
    });

    const workerRes = await worker.fetch(request);
    res.statusCode = workerRes.status;
    workerRes.headers.forEach((value, key) => res.setHeader(key, value));
    if (workerRes.body) {
      Readable.fromWeb(workerRes.body).pipe(res);
    } else {
      res.end(Buffer.from(await workerRes.arrayBuffer()));
    }
  } catch (err) {
    res.statusCode = 500;
    res.end("dev-server error: " + (err && err.stack ? err.stack : String(err)));
  }
});

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

server.listen(PORT, () => {
  console.log(`Word Unscrambler dev server running at http://localhost:${PORT}`);
  console.log(`Serving local files through worker.js (canonical host: ${CANONICAL_HOST})`);
});
