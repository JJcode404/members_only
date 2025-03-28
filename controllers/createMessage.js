import { pool } from "../db/pool.js";
const createMessagePage = (req, res) => {
  res.render("createMessage");
};

const postUserMessage = async (req, res) => {
  try {
    await pool.query(
      "INSERT INTO messages (message_title, message, user_id, created_at) VALUES ($1, $2, $3, NOW())",
      [req.body.title, req.body.message, req.user.user_id]
    );

    res
      .status(201)
      .json({ success: true, message: "Message posted successfully" });
  } catch (error) {
    console.error("Error inserting message:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteMessage = async (req, res) => {
  console.log("deleting message");
  const messageId = req.params.id;
  console.log(messageId);
  await pool.query("DELETE FROM messages WHERE message_id = $1", [messageId]);

  res.redirect("/");
};

export { createMessagePage, postUserMessage, deleteMessage };
