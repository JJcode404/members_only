import { getUserMessages } from "../db/queries.js";

const homePage = async (req, res) => {
  try {
    const userMessages = await getUserMessages();
    console.log(userMessages);
    res.render("index", { userMessages });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving analytics data",
      error: error.message,
    });
  }
};

export { homePage };
