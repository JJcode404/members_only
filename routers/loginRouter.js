import { Router } from "express";
import passport from "passport";
import { authenticateUser, loginPage } from "../controllers/login.js";

const loginRouter = Router();
loginRouter.get("/", loginPage);
// loginRouter.post("/", authenticateUser);s
loginRouter.post("/", (req, res, next) => {
  console.log("Request body:", req.body);
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect("/login");
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect("/");
    });
  })(req, res, next);
});

export { loginRouter };
