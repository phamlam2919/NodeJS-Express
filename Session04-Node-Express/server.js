const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;
// const dataUsers = require("./data.json");
app.use(bodyParser.urlencoded({ extended: false }));
// Express là 1 framework server được xây dựng trên nền tảng nodeJS
// Express giúp chúng ta dễ dàng sưr dụng các hàm có sẫn để viết API đễ dàng hơn
// Express hoạt động nhanh câu lệnh ngắn gọn

// 1: Khái niệm Routing trong EXpress
// Cấu trúc: app.[get, post, put, patch, delete] ('./route', (req, res)=> {
// enter logic code
// })

// req là 1 object chứa toàn bộ thông tin người dùng gửi về cho server
// console.log(req.query);

// res là 1 object chứa các phương thức mà server gửi về cho client
// console.log(res);

// Định nghĩa query: domain/key1 = value1 & key2 = value2 & ... keyM = valueM
// Định nghĩa params: domain/users/id || name || ...

app.get("/", (req, res) => {
    res.send("<h1>Home page</h1>");
});
app.get("/product", (req, res) => {
    res.send("<h1>product page</h1>");
});
app.get("/products", (req, res) => {
    const dataUsers = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
    res.send(dataUsers);
});

app.get("/json/:id", (req, res) => {
    res.json(users);
});

app.post("/products", (req, res) => {
    const dataUsers = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
    const newData = req.body;
    dataUsers.users.push(newData);
    fs.writeFileSync("./data.json", JSON.stringify(dataUsers));
    res.send("success");
});
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
