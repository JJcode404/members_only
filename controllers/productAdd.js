import { pool } from "../db/pool.js";
import { analytics } from "../db/queries.js";

const getproductAddPage = async (req, res) => {
  try {
    const categories = await analytics.getCategories();
    console.log(categories);
    res.render("product/productAdd", {
      categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving analytics data" });
  }
};

const getProductList = async (req, res) => {
  try {
    const stats = await analytics.getproductList();

    res.render("product/productList", { stats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving analytics data" });
  }
};

const addProduct = async (req, res) => {
  console.log(req.body);
  const {
    productName,
    description,
    price,
    stock,
    productCategory,
    brandName,
    weight,
    gender,
    size,
    color,
    discount,
    image,
  } = req.body;

  try {
    const query = `
      INSERT INTO Products (name, description, price, stock_quantity, category_id, brand, weight, gender, size, color, discount,image) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
      RETURNING *;
    `;

    const values = [
      productName,
      description,
      price,
      stock,
      productCategory,
      brandName,
      weight,
      gender,
      size,
      color,
      discount,
      image,
    ];

    const result = await pool.query(query, values);

    res.render("thankyou", {
      url: "/product/productList",
      page: "product List",
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getproductAddPage, addProduct, getProductList };
