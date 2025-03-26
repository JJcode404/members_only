import { Router } from "express";
import {
  addCustomer,
  getcustomerAddPage,
  getCustomerList,
} from "../controllers/customerController.js";
import { validateCustomer } from "../validators/customerValidator.js";

const customerRouter = Router();
customerRouter.get("/addCustomer", getcustomerAddPage);
customerRouter.get("/customerList", getCustomerList);
customerRouter.post("/addCustomer", validateCustomer, addCustomer);

export { customerRouter };
