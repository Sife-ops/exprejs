import ejs from "ejs";
import express from "express";
import { fileURLToPath } from "url";

const router = express.Router();

// views
router.get("/", function (_, res) {
  res.render("index");
});

router.get("/about", function (_, res) {
  res.render("about", {
    location: "ur mom",
  });
});

router.get("/sign-in", function (_, res) {
  res.render("sign-in");
});

// ajax
router.post("/lol", async function (_, res) {
  res.send(
    await ejs.renderFile("./hx/lol.ejs", {
      message: "xd",
    })
  );
});

router.post("/sign-in_", async function (req, res) {
  const fakeEmail = "email1";
  const fakePass = "pass1";
  if (req.body.email !== fakeEmail || req.body.password !== fakePass) {
    return res.send(await ejs.renderFile("./hx/sign-in-problem.ejs"));
  }
  res
    .setHeader(
      "HX-Trigger",
      '{"save-token": {"token": "todo", "other": "something"}}'
    )
    .setHeader("HX-Redirect", "/about")
    .send("");
});

// server
async function main() {
  const app = express();
  app.set("view engine", "ejs");

  //   app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    express.static(
      fileURLToPath(new URL("./node_modules/htmx.org/dist", import.meta.url))
    )
  );
  app.use(express.static(fileURLToPath(new URL("./public", import.meta.url))));

  app.use("/", router);
  app.listen(3000); // todo: hardcoded
}

main();
