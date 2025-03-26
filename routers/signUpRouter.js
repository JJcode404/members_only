import { Router } from "express";
import { singUppage } from "../controllers/signup.js";

const signRouter = Router();
signRouter.get("/sign-up", singUppage);

export { signRouter };
