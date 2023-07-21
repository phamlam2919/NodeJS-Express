const http = require("http");
const port = 3000;
const fs = require("fs");
const url = require("url");
const server = http.createServer((req, res) => {
    res.writeHead(200, "Content-Type", "text/html; charset=utf-8");
    const getform = fs.readFileSync("./view/get-form.html", "utf-8");
    const postform = fs.readFileSync("./view/post-form.html", "utf-8");
    res.write(postform);
    // res.write(getform);
    res.end();

    const query = url.parse(req.url, true);
    if (req.method === "POST")
        req.on("error", (err) => {
            console.error(err);
        })
            .on("data", (chuck) => {
                data += chuck.toString();
            })
            .on("end", () => {
                console.log(data);
            });
});
server.listen(port, () => {
    console.log(`app listen on http://localhost:${port} `);
});
