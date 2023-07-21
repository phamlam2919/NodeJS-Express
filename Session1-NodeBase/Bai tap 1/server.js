const http = require("http");
const fs = require("fs");
const port = 3000;
const url = require("url");

const server = http.createServer((req, res) => {
  //Cau truc fs.readFileSync(file, charset,callback)
  //file : muon doc
  //charset: utf8 hoac 1 ma phien dich
  //callback func
  const { query, pathname } = url.parse(req.url, true);
  res.writeHead(200, { "content-Type": "Text/html" });
  if (pathname === "/homepage" || pathname === "/") {
    res.write("<h1> this is home page</h1>");
  } else if (pathname === "/overview") {
    res.write("<h1> This is overview</h1>");
  } else if (pathname === "/product") {
    res.write("<h1> This is product</h1>");
  } else {
    res.writeHead(404, { "content-Type": "Text/html" });
    res.write("<h1> PAGE NOT FOUND</h1>");
  }
  res.end();

  const dataText = fs.readFileSync("./txt/read-this.txt", "utf8");

  // Cấu trúc fs.writeFileSync(file,data,option)
  // file: đường dẫn đến file cần ghi
  // data: data muốn ghi vào file
  // option: charset: utf8

  const dataInput = "this is data input";
  const dataAppend = "this is data append";
  const finalData = dataInput + "\n" + dataAppend;

  fs.writeFileSync("./txt/final.txt", finalData);
  console.log("Write file final sucsess ");
  const readFile = fs.readFileSync("./txt/final.txt", "utf8");
  console.log(readFile);

  console.log(dataText);
  res.writeHead(200, { "content-Type": "text/html ; charset=utf-8" });
  res.write(dataText);
  res.end();
});
server.listen(3000, "127.0.0.1", function () {
  console.log("listening on port 3000");
});
