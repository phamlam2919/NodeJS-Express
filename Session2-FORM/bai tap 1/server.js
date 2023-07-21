const http = require("http");
const port = 3000;
const fs = require("fs");
const url = require("url");
const queryString = require("querystring");

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

    const searchBox = fs.readFileSync("./templates/search.html", "utf-8");
    const createBox = fs.readFileSync("./templates/create.html", "utf-8");
    const overviewPage = fs.readFileSync("./templates/overview.html", "utf-8");
    let dataFruits = JSON.parse(fs.readFileSync("./data-backup.json", "utf-8"));
    const productPage = fs.readFileSync("./templates/product.html", "utf-8");
    const cardTemplate = fs.readFileSync(
        "./templates/card-temple.html",
        "utf-8"
    );

    if (pathname === "/") {
        const cardItem = dataFruits.map((fruit) =>
            cardTemplate
                .replace("{{img}}", fruit.image)
                .replace("{{productName}}", fruit.productName)
                .replace("{{quantity}}", fruit.quantity)
                .replace("{{price}}", fruit.price)
                .replace("{{productId}}", fruit.id)
        );

        res.write(
            overviewPage.replace(
                `<div class="cards-container"></div>`,
                `<div class="cards-container">${cardItem}</div>`
            )
        );
    } else if (pathname === "/search") {
        const searchFruits = dataFruits.filter((fruit) =>
            fruit.productName.includes(query.q)
        );

        const cardItem = searchFruits.map((fruit) =>
            cardTemplate
                .replace("{{img}}", fruit.image)
                .replace("{{productName}}", fruit.productName)
                .replace("{{quantity}}", fruit.quantity)
                .replace("{{price}}", fruit.price)
                .replace("{{productId}}", fruit.id)
        );

        const updatedOverviewPage = overviewPage
            .replace(
                `<figure class="card"></figure>`,
                `<figure class="card">${searchBox}</figure>`
            )
            .replace(
                `<div class="cards-container"></div>`,
                `<div class="cards-container">${cardItem}</div>`
            );

        res.write(updatedOverviewPage);
    } else if (pathname.includes("product")) {
        const id = pathname.split("/")[2];
        const searchFruits = dataFruits.find((fruit) => fruit.id == id);

        const fruitDetail = productPage
            .replace("{{image}}", searchFruits.image)
            .replace("{{productName}}", searchFruits.productName)
            .replace("{{quantity}}", searchFruits.quantity)
            .replace("{{price}}", searchFruits.price)
            .replace("{{from}}", searchFruits.from)
            .replace("{{nutrients}}", searchFruits.nutrients)
            .replace("{{organic}}", searchFruits.organic ? "organic" : "")
            .replace("{{description}}", searchFruits.description)
            .replace("{{id}}", searchFruits.id);

        res.write(fruitDetail);
    } else if (pathname === "/create") {
        if (req.method == "POST") {
            let data = "";
            req.on("error", (err) => {
                console.error(err);
            })
                .on("data", (chunk) => {
                    data += chunk.toString();
                })
                .on("end", () => {
                    const input = queryString.parse(data);
                    let newFruit = {
                        id: Date.now().toString(), // Tạo id mới
                        productName: input.productName,
                        image: input.image,
                        from: input.from,
                        nutrients: input.nutrients,
                        quantity: input.quantity,
                        price: input.price,
                        organic: input.organic === "on", // Đảm bảo organic là boolean
                        description: input.description,
                    };
                    dataFruits = [...dataFruits, newFruit];
                    fs.writeFileSync(
                        "./data-backup.json",
                        JSON.stringify(dataFruits)
                    );
                    console.log(dataFruits);
                });
        }

        const updatedOverviewPage = overviewPage.replace(
            `<figure class="card"></figure>`,
            `<figure class="card">${createBox}</figure>`
        );

        res.write(updatedOverviewPage);
    } else {
        res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
        res.write("Page not found");
    }

    res.end();
});

server.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
