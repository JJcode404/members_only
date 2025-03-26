import { pool } from "../db/pool.js";
import { analytics } from "../db/queries.js";

const getcustomerAddPage = (req, res) => {
  res.render("customer/customerAdd", {
    title: "Add customer",
  });
};
const getCustomerList = async (req, res) => {
  try {
    const stats = await analytics.getCustomerList();
    console.log(stats);
    res.render("customer/customerList", { stats: stats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving analytics data" });
  }
};

const addCustomer = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    gender,
    address,
    country,
    postalcode,
    image,
  } = req.body;

  try {
    const query = `
      INSERT INTO Users (name, email, phone_number, gender, address, country, postal_code, image, password)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'default_password') 
      RETURNING *;
    `;

    const values = [
      `${firstName} ${lastName}`,
      email,
      phoneNumber,
      gender,
      address,
      country,
      postalcode,
      image,
    ];

    const result = await pool.query(query, values);

    res.render("thankyou", {
      url: "/customer/customerList",
      page: "customer List",
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getcustomerAddPage, addCustomer, getCustomerList };
