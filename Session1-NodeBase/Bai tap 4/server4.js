const http = require("http");
const port = 3010;
const fs = require("fs");

const server = http.createServer((req, res) => {
  //Buoc 1 : Khoi tao sever
  //Buoc 2: Tao folder txt co file final.txt
  //Buoc 3: requise fs vao va su dung ham fs.readfileFolder
  const readFinal = fs.readFileSync("./txt/final.txt", "utf8");
  console.log(readFinal);
  //Buo 4: In ra man hinh cilient
  res.writeHead(200, { "content-Type": "Text/html ; charset=utf-8" });
  res.write(readFinal);
  res.end();
});
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
