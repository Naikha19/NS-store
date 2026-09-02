import pool from "../db/pool.js";
import bcrypt from "bcryptjs";
import AppError from "../utils/AppError.js";

export const getUsers = async () => {
  const users = await pool.query(
    "SELECT id, email, role, created_at FROM Users",
  );
  return users.rows;
};

export const createUser = async (firstname,lastname,email,phonenumber, password) => {
  try {
    const emailExist = await pool.query(
      "SELECT id FROM users WHERE email = $1 LIMIT 1",
      [email],
    );
    if (emailExist.rows.length > 0) {
      throw new AppError(
        "Email already registred",
        409
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await pool.query(
      "INSERT INTO users (firstname, lastname,email,phonenumber, password_hash) VALUES ($1, $2, $3, $4, $5) RETURNING id,firstname,lastname, email, phonenumber, role, created_at",
      [firstname,lastname,email,phonenumber, hashedPassword],
    );

    return user.rows[0];
  } catch (error) {
    throw error
  }
};

export const userLogin = async (email, password) => {
  try {
    const result = await pool.query(
      "SELECT id, email, password_hash, role FROM users WHERE email = $1",
      [email],
    );

    if (result.rows.length === 0) {
      return null;
    }
    const user = result.rows[0];

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getProducts = async () =>{
  const products = await pool.query()
  "SELECT  id, name, sku, category_id, cost_price, selling_price, quantity, low_stock_threshold, created_at FROM products"
  return products.rows;
}