const pool = require("../config/db");

async function createUser({ name, email, password_hash, role = "user" }) {
  const query = `
    INSERT INTO users (name, email, password_hash, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role, created_at;
  `;
  const values = [name, email, password_hash, role];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function findUserByEmail(email) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
}

async function findUserById(id) {
  const { rows } = await pool.query(
    "SELECT id, name, email, role, created_at FROM users WHERE id = $1",
    [id]
  );
  return rows[0];
}

async function getAllUsers() {
  const { rows } = await pool.query(
    "SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC"
  );
  return rows;
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
};
