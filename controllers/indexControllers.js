import { analytics } from "../db/queries.js";

const getIndex = async (req, res) => {
  try {
    const stats = await analytics.getAnalytics();
    console.log(stats);
    res.render("index", { stats: stats });
  } catch (error) {
    console.error("Error in getIndex:", error);
    res.status(500).json({
      message: "Error retrieving analytics data",
      error: error.message,
    });
  }
};

export { getIndex };
