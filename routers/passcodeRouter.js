import { Router } from "express";
import { passcodePage } from "../controllers/passcode.js";

const passcodeRouter = Router();
passcodeRouter.get("/", passcodePage);

export { passcodeRouter };
