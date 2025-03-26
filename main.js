import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { indexRouter } from "./routers/indexRouter.js";
import { categoryRouter } from "./routers/categoryAddRouter.js";
import { getproductAddPage } from "./controllers/productAdd.js";
import { customerRouter } from "./routers/customerRouter.js";
import { productRouter } from "./routers/productRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsPath = path.join(__dirname, "public");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));

app.use("/", indexRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/customer", customerRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
