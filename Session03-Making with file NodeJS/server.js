const fs = require("fs");
const http = require("http");
const url = require("url");
const port = 3000;
const nodeStatic = require("node-static");
const file = new nodeStatic.Server("./public");
const server = http.createServer((req, res) => {
    // const { query } = url.parse(req.url, true);

    file.serve(req, res);
    // fs.writeFileSync("./txt/firtData.txt", "This is firt data");
    // fs.writeFileSync("./txt/midData.txt", "This is mid data");
    // fs.writeFileSync("./txt/lastData.txt", "This is last data");

    res.writeHead(200, "Content-Type", "text/html; charset=utf-8");
    const firtData = fs.readFileSync("./txt/firtData.txt", "utf-8");
    console.log(firtData);
    const midData = fs.readFileSync("./txt/midData.txt", "utf-8");
    console.log(midData);
    const lastData = fs.readFileSync("./txt/lastData.txt", "utf-8");
    console.log(lastData);

    // const finalData = `${firtData} ${midData} ${lastData}`;
    // fs.writeFileSync("./txt/finalData.txt", finalData);
    // console.log("finalData===============");

    let readContentHTML = fs.readFileSync("./views/content.html", "utf8");
    // console.log(readContentHTML);
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write(readContentHTML);
    res.end();
    console.log(firtData);

    let newData = "talking about Products";
    let newFristData = `${firtData} is ${newData}`;
    console.log(newFristData);
    fs.writeFileSync("./txt/firtData.txt", newFristData);
});

server.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
