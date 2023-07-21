const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.send("<h1>This is homepage</h1>");
});
app.get("/overview", (req, res) => {
    res.send("<h1>This is overview page</h1>");
});
app.get("/product", (req, res) => {
    res.send("<h1>This is product page</h1>");
});
app.get("/*", (req, res) => {
    res.send("<h1> PAGE NOT FOUND</h1>");
});

app.get("/api/v1/users", (req, res) => {
    const dbUsers = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    res.status(200).json({ message: "Successfully Registered" });
});

app.get("/api/v1/users/:id", (req, res) => {
    const UsersID = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    const idUser = req.params.id;
    const user = UsersID.find((user) => user.id === idUser);
    res.status(200).json(user);
});
app.post("/api/v1/users", (req, res) => {
    const dataUsers = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    const newData = req.body;
    dataUsers.user.push(newData);
    fs.writeFileSync("./db.json", JSON.stringify(dataUsers));
    res.send("success");
});
app.delete("/api/v1/users/:id", (req, res) => {
    let dataUSer = JSON.parse(fs.readFileSync("./db.json", "utf-8")).user;

    let userIdDelete = req.params.id;

    let updatedUsers = dataUSer.filter((user) => user.id != userIdDelete);

    if (updatedUsers.length == dataUSer.length) {
        res.status(404).json({ message: "User not found" });
    } else {
        fs.writeFileSync(
            "./db.json",
            JSON.stringify({ user: updatedUsers }),
            "utf-8"
        );
        res.status(200).json({ message: "User deleted successfully" });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
