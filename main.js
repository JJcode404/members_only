import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { signRouter } from "./routers/signUpRouter.js";
import { loginRouter } from "./routers/loginRouter.js";
import { homeRouter } from "./routers/indexRouter.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsPath = path.join(__dirname, "public");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));

app.use("/", homeRouter);
app.use("/sign-up", signRouter);
app.use("/login", loginRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
