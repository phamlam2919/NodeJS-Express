const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  res.writeHead(200, { "content-Type": "Text/html" });

  if (pathname === "/home" || pathname === "/") {
    res.write("<h1> Hello World  1999</h1>");
  } else if (pathname === "/product") {
    res.write("<h1> This is Product</h1>");
  } else if (pathname === "/contact") {
    res.write("<h1> This is Contact</h1>");
  } else {
    res.writeHead(404, { "content-Type": "Text/html" });
    res.write("<h1> 404 not defind</h1>");
  }
  res.end();
});
server.listen(3000, "127.0.0.1", function () {
  console.log("listening on port 3000");
});
