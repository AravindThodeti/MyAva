const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    if (pathname === "/service-worker.js" || pathname.startsWith("/workbox-")) {
      app.serveStatic(req, res, `./public${pathname}`);
    } else if (pathname === "/localforage.min.js") {
      app.serveStatic(req, res, "./public/localforage.min.js");
    } else if (pathname === "/firebase-messaging-sw.js") {
      app.serveStatic(req, res, "./public/firebase-messaging-sw.js");
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
