import express from "express";
import { fileURLToPath } from "url";

const router = express.Router();

router.get("/", function(_, res) {
    res.render("index");
});

router.get("/about", function(_, res) {
    res.render("about");
});

router.post("/clicked", function(_, res) {
    res.send("<div>lol!</div>");
});

function main() {
    const app = express();
    app.set("view engine", "ejs");

    const htmx = fileURLToPath(new URL("./node_modules/htmx.org/dist", import.meta.url));
    app.use("/htmx", express.static(htmx))

    // app.use(express.json());
    app.use("/", router);
    app.listen(3000); // todo: hardcoded
}

main();

