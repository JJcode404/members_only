import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pkg;

const SQL = `
CREATE TABLE IF NOT EXISTS Users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    gender VARCHAR(10),
    address TEXT,
    country VARCHAR(100),
    postal_code VARCHAR(20),
    image TEXT
);

CREATE TABLE IF NOT EXISTS Categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    created_by VARCHAR(50) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    publish_date DATE,
    description TEXT,
    image TEXT
);

CREATE TABLE IF NOT EXISTS Products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    category_id INT NOT NULL,
    brand VARCHAR(100),
    weight VARCHAR(50),
    gender VARCHAR(10),
    size VARCHAR(10),
    color VARCHAR(50),
    discount DECIMAL(5,2) DEFAULT 0,
    image TEXT,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Cart (
    cart_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS CartItems (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id INT,
    product_id INT,
    quantity INT NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES Cart(cart_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT,
    total_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS OrderItems (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Payments (
    payment_id SERIAL PRIMARY KEY,
    order_id INT UNIQUE,
    payment_method VARCHAR(50) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'Pending',
    transaction_id VARCHAR(255) UNIQUE,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Shipping (
    shipping_id SERIAL PRIMARY KEY,
    order_id INT UNIQUE,
    tracking_number VARCHAR(100) UNIQUE,
    courier VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Processing',
    estimated_delivery_date DATE,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE
);

INSERT INTO Users (name, email, password, phone_number, gender, address, country, postal_code, image) VALUES
    ('Alice Johnson', 'alice@example.com', 'hashedpassword', '1234567890', 'Female', '123 Main St', 'USA', '10001', 'alice.jpg'),
    ('Bob Smith', 'bob@example.com', 'hashedpassword', '9876543210', 'Male', '456 Elm St', 'Canada', 'A1B2C3', 'bob.jpg'),
    ('Charlie Brown', 'charlie@example.com', 'hashedpassword', '1112223333', 'Male', '789 Oak St', 'UK', 'SW1A 1AA', 'charlie.jpg'),
    ('Diana Ross', 'diana@example.com', 'hashedpassword', '4445556666', 'Female', '101 Pine St', 'Australia', '2000', 'diana.jpg'),
    ('Eve Adams', 'eve@example.com', 'hashedpassword', '5556667777', 'Female', '555 Maple St', 'Germany', '10115', 'eve.jpg'),
    ('Frank Harris', 'frank@example.com', 'hashedpassword', '6667778888', 'Male', '777 Birch St', 'France', '75001', 'frank.jpg');

INSERT INTO Categories (name, created_by, stock, publish_date, description, image) VALUES
    ('Electronics', 'Admin', 100, '2024-03-01', 'Gadgets and devices', 'electronics.jpg'),
    ('Clothing', 'Admin', 200, '2024-03-02', 'Men and women apparel', 'clothing.jpg'),
    ('Home & Kitchen', 'Admin', 150, '2024-03-03', 'Household essentials', 'home.jpg'),
    ('Sports', 'Admin', 80, '2024-03-04', 'Sports equipment and gear', 'sports.jpg');

INSERT INTO Products (name, description, price, stock_quantity, category_id, brand, weight, gender, size, color, discount, image) VALUES
    ('Smartphone', 'Latest model smartphone', 699.99, 50, 
        (SELECT category_id FROM Categories WHERE name = 'Electronics'), 
        'BrandX', '200g', 'Unisex', 'N/A', 'Black', 5, 'smartphone.jpg'),

    ('Laptop', 'Powerful laptop for work', 1299.99, 30, 
        (SELECT category_id FROM Categories WHERE name = 'Electronics'), 
        'BrandY', '2kg', 'Unisex', 'N/A', 'Silver', 10, 'laptop.jpg'),

    ('Headphones', 'Noise-canceling headphones', 199.99, 80, 
        (SELECT category_id FROM Categories WHERE name = 'Electronics'), 
        'BrandZ', '250g', 'Unisex', 'N/A', 'Blue', 15, 'headphones.jpg'),

    ('T-Shirt', 'Cotton T-shirt', 19.99, 100, 
        (SELECT category_id FROM Categories WHERE name = 'Clothing'), 
        'BrandA', '300g', 'Male', 'L', 'White', 5, 'tshirt.jpg'),

    ('Blender', 'High-speed kitchen blender', 79.99, 40, 
        (SELECT category_id FROM Categories WHERE name = 'Home & Kitchen'), 
        'BrandB', '1.5kg', 'Unisex', 'N/A', 'Red', 10, 'blender.jpg'),

    ('Soccer Ball', 'Official size 5 soccer ball', 49.99, 60, 
        (SELECT category_id FROM Categories WHERE name = 'Sports'), 
        'BrandC', '450g', 'Unisex', 'N/A', 'White/Black', 7, 'soccerball.jpg');


INSERT INTO Orders (user_id, total_price, status) VALUES
    (1, 699.99, 'Pending'),
    (2, 1299.99, 'Shipped'),
    (3, 199.99, 'Delivered'),
    (4, 19.99, 'Processing'),
    (5, 79.99, 'Pending'),
    (6, 49.99, 'Shipped');

INSERT INTO OrderItems (order_id, product_id, quantity, price) VALUES
    (1, 1, 1, 699.99),
    (2, 2, 1, 1299.99),
    (3, 3, 2, 199.99),
    (4, 4, 3, 19.99),
    (5, 5, 1, 79.99),
    (6, 6, 2, 49.99);
`;

async function main() {
  console.log("Connecting to database:", process.env.DATABASE_NAME);
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
