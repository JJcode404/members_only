import { pool } from "./pool.js";

function createAnalytics() {
  const getTotalCustomers = async () => {
    const result = await pool.query("SELECT COUNT(*) FROM users;");
    return Number(result.rows[0].count);
  };

  const getTotalProducts = async () => {
    const result = await pool.query("SELECT COUNT(*) FROM products;");
    return Number(result.rows[0].count);
  };

  const getTotalOrders = async () => {
    const result = await pool.query("SELECT COUNT(*) FROM orders;");
    return Number(result.rows[0].count);
  };

  const getTotalSales = async () => {
    const result = await pool.query(
      "SELECT SUM(quantity * price) AS total_sales FROM OrderItems;"
    );
    return result.rows[0].total_sales || 0;
  };

  const getTotalOutstockProducts = async () => {
    const result = await pool.query(
      "SELECT COUNT(*) FROM Products WHERE stock_quantity = 0;"
    );
    return Number(result.rows[0].count);
  };

  const getTopSellingProduct = async () => {
    const result = await pool.query(`
      SELECT p.product_id, p.name, SUM(oi.quantity) AS total_sold
      FROM orderitems oi
      JOIN products p ON oi.product_id = p.product_id
      GROUP BY p.product_id, p.name
      ORDER BY total_sold DESC
      LIMIT 1;
    `);

    if (result.rows.length === 0) {
      return "No sales available";
    }

    return {
      id: result.rows[0].id,
      name: result.rows[0].name,
      totalSold: Number(result.rows[0].total_sold),
    };
  };
  const getproductList = async () => {
    const result = await pool.query(`
    SELECT 
    p.name AS product_name,
    p.price,
    p.color,
    p.stock_quantity AS stock,
    c.name AS category_name
    FROM Products p
    JOIN Categories c ON p.category_id = c.category_id;
    `);
    return result.rows;
  };
  const getCategoryList = async () => {
    const result = await pool.query(`
      SELECT 
      c.name,
      c.category_id,
      c.created_by,
      c.stock,
      c.publish_date
      FROM categories c;
      `);
    return result.rows;
  };
  const getCustomerList = async () => {
    const result = await pool.query(`
      SELECT
      u.user_id,
      u.name,
      u.email,
      u.phone_number,
      u.gender,
      u.address,
      u.country 
      FROM users u;
      `);
    return result.rows;
  };
  const getCategories = async () => {
    const result = await pool.query(`SELECT category_id, name FROM Categories`);
    return result.rows;
  };

  const getAnalytics = async () => {
    const [customers, products, orders, sales, outOfstocks, topSellingProduct] =
      await Promise.all([
        getTotalCustomers(),
        getTotalProducts(),
        getTotalOrders(),
        getTotalSales(),
        getTotalOutstockProducts(),
        getTopSellingProduct(),
      ]);

    return {
      totalCustomers: customers,
      totalProducts: products,
      totalOrders: orders,
      totalSales: sales,
      totalOutOfstocks: outOfstocks,
      topSellingProduct: topSellingProduct,
    };
  };

  return {
    getTotalCustomers,
    getTotalProducts,
    getTotalOrders,
    getTotalSales,
    getAnalytics,
    getTotalOutstockProducts,
    getproductList,
    getCategoryList,
    getCustomerList,
    getCategories,
  };
}

const analytics = createAnalytics();

export { analytics };
