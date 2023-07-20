import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();
const connection = await mysql.createConnection(
  process.env.DATABASE_URL as string
);
console.log("Connected to PlanetScale!");

const app = express();

app.get("/", async (req, res) => {
  const products = await connection.query("SELECT * FROM products");
  res.send(products[0]);
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});

/* const testConnection = async () => {
  const dropTableIfExist = "DROP TABLE IF EXISTS products";
  const createProductsTableSQL = `CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(240), 
    product_price INT(20),
    PRIMARY KEY (id)
    )`;
  const insertProduct =
    "INSERT INTO products (product_name, product_price) VALUES ('product1', 100), ('product2', 200), ('product3', 300)";

  const populate = async () => {
    try {
      await connection.query(dropTableIfExist);
      await connection.query(createProductsTableSQL);
      await connection.query(insertProduct);
      console.log("Populated the table with products");
      return await connection.query("SELECT * FROM products");
    } catch (error) {
      console.log(error);
    }
  };

  await populate();
  connection.end();
}; */
