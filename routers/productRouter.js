import { Router } from "express";
import {
  addProduct,
  getproductAddPage,
  getProductList,
} from "../controllers/productAdd.js";
import { validateProduct } from "../validators/productValidator.js";

const productRouter = Router();
productRouter.get("/addProduct", getproductAddPage);
productRouter.get("/productList", getProductList);
productRouter.post("/addProduct", addProduct);

export { productRouter };
