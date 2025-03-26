import { Router } from "express";
import { loginPage } from "../controllers/login.js";

const loginRouter = Router();
loginRouter.get("/login", loginPage);

export { loginRouter };
