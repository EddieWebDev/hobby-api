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

export default app;