const http = require("http");
const port = 3009;
const url = require("url");
const fs = require("fs");

const server = http.createServer((req, res) => {
  //read file data Json
  const dataJson = fs.readFileSync("./data/data.json", "utf-8");
  //convert data json to data obj
  const dataObj = JSON.parse(dataJson);
  const { query, pathname } = url.parse(req.url, true);
  res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
  if (pathname === "/homepage" || pathname === "/") {
    res.write("<h1> this is home page</h1>");
  } else if (pathname === "/overview") {
    res.write("<h1> This is overview</h1>");
  } else if (pathname === "/product") {
    res.write("<h1> This is product</h1>");
  } else if (pathname === "/api") {
    res.write(dataJson);
  } else {
    const pathArr = pathname.split("/");
    const id = pathArr[pathArr.length - 1];
    const item = dataObj.find((item) => item.id == id);
    if (item) {
      console.log(item);
      res.write(JSON.stringify(item));
    } else {
      res.writeHead(404, { "content-Type": "Text/html" });
      res.write("<h1> PAGE NOT FOUND</h1>");
    }
  }
  res.end();
});
server.listen(port, "127.0.0.1", function () {
  console.log(`listening on port ${port} `);
});
