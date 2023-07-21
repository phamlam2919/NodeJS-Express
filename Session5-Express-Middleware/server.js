const express = require("express");
const port = 3000;

const app = express();

const user = {
    userName: "Lamm",
    password: "12345",
};

const reqUser = {
    userName: "Giangg",
    password: "123456",
};
const middlewareCheckLogin = (req, res, next) => {
    // logic code của middleware
    if (
        (reqUser.userName = user.userName && reqUser.password == user.password)
    ) {
        console.log("Login success");
        next();
    } else {
        console.log("Login error");
        res.redirect("/login");
    }
};

app.get("/", (req, res) => {
    res.end("<h1>đây là home page</h1>");
});

app.get("/payment", middlewareCheckLogin, (req, res) => {
    res.end("<h1>yêu cầu đăng nhập </h1>");
});

app.get("/login", (req, res) => {
    res.end("<h1>Login</h1>");
});

app.listen(port, () => {
    console.log("listening on port: ", port);
});
