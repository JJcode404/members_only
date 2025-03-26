import { Router } from "express";
import { getIndex } from "../controllers/indexControllers.js";

const indexRouter = Router();
indexRouter.get("/", getIndex);

export { indexRouter };
