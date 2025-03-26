import bcrypt, { compareSync } from "bcryptjs";
import { pool } from "../db/pool.js";
const singUppage = (req, res) => {
  res.render("sign-up");
};

const postUserDetails = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.passwordDls, 10);
    await pool.query(
      "INSERT INTO users (username, password, full_name,membership_status) VALUES ($1, $2, $3,$4)",
      [req.body.email, hashedPassword, req.body.fullname, "admin"]
    );

    res.redirect("/");
  } catch (error) {
    console.error("Error inserting user:", error);
    next(error);
  }
};

export { singUppage, postUserDetails };
