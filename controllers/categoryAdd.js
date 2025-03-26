import { pool } from "../db/pool.js";
import { analytics } from "../db/queries.js";
const getCategoryAddPage = (req, res) => {
  res.render("category/categoryAdd", {
    title: "Create roduct PCategory",
  });
};
const getCategoryList = async (req, res) => {
  try {
    const stats = await analytics.getCategoryList();
    console.log(stats);
    res.render("category/categoryList", { stats: stats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving analytics data" });
  }
};

const addCategory = async (req, res) => {
  console.log(req.body);
  const { categoryTitle, createdBy, stock, publishDate, description, image } =
    req.body;

  try {
    const query = `
      INSERT INTO Categories (name, created_by, stock, publish_date, description, image) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *;
    `;

    const values = [
      categoryTitle,
      createdBy,
      stock,
      publishDate,
      description,
      image,
    ];

    const result = await pool.query(query, values);

    res.render("thankyou", {
      url: "/category/categoryList",
      page: "category List",
    });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getCategoryAddPage, addCategory, getCategoryList };
