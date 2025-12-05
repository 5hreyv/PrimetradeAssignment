const pool = require("../config/db");

async function createTradeSignal(data) {
  const {
    title,
    symbol,
    entry_price,
    target_price,
    stop_loss,
    risk_level,
    status,
    created_by,
  } = data;

  // performance_score = (target - entry) / entry
  let performance_score = null;
  if (entry_price && target_price) {
    const entry = Number(entry_price);
    const target = Number(target_price);
    if (entry > 0) {
      performance_score = (target - entry) / entry;
    }
  }

  const query = `
    INSERT INTO trade_signals
    (title, symbol, entry_price, target_price, stop_loss, risk_level, status, created_by, performance_score)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING *;
  `;
  const values = [
    title,
    symbol,
    entry_price,
    target_price,
    stop_loss,
    risk_level,
    status || "OPEN",
    created_by,
    performance_score,
  ];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function listTradeSignals({
  user,
  page = 1,
  limit = 10,
  symbol,
  risk_level,
  status,
  sort = "created_at_desc",
}) {
  let baseQuery = `SELECT * FROM trade_signals`;
  const conditions = [];
  const values = [];

  if (user.role !== "admin") {
    conditions.push(`created_by = $${values.length + 1}`);
    values.push(user.id);
  }

  if (symbol) {
    conditions.push(`symbol = $${values.length + 1}`);
    values.push(symbol);
  }

  if (risk_level) {
    conditions.push(`risk_level = $${values.length + 1}`);
    values.push(risk_level);
  }

  if (status) {
    conditions.push(`status = $${values.length + 1}`);
    values.push(status);
  }

  if (conditions.length > 0) {
    baseQuery += " WHERE " + conditions.join(" AND ");
  }

  let orderBy = "created_at DESC";
  if (sort === "risk") orderBy = "risk_level ASC";
  if (sort === "entry_price") orderBy = "entry_price ASC";
  if (sort === "performance") orderBy = "performance_score DESC";

  baseQuery += ` ORDER BY ${orderBy}`;

  const offset = (page - 1) * limit;
  baseQuery += ` LIMIT ${limit} OFFSET ${offset}`;

  const { rows } = await pool.query(baseQuery, values);
  return rows;
}

async function getTradeSignalById(id) {
  const { rows } = await pool.query(
    "SELECT * FROM trade_signals WHERE id = $1",
    [id]
  );
  return rows[0];
}

async function updateTradeSignal(id, updates) {
  const {
    title,
    symbol,
    entry_price,
    target_price,
    stop_loss,
    risk_level,
    status,
  } = updates;

  let performance_score = null;
  if (entry_price && target_price) {
    const entry = Number(entry_price);
    const target = Number(target_price);
    if (entry > 0) {
      performance_score = (target - entry) / entry;
    }
  }

  const query = `
    UPDATE trade_signals
    SET title=$1,
        symbol=$2,
        entry_price=$3,
        target_price=$4,
        stop_loss=$5,
        risk_level=$6,
        status=$7,
        performance_score=$8
    WHERE id=$9
    RETURNING *;
  `;

  const values = [
    title,
    symbol,
    entry_price,
    target_price,
    stop_loss,
    risk_level,
    status,
    performance_score,
    id,
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function deleteTradeSignal(id) {
  await pool.query("DELETE FROM trade_signals WHERE id = $1", [id]);
}

module.exports = {
  createTradeSignal,
  listTradeSignals,
  getTradeSignalById,
  updateTradeSignal,
  deleteTradeSignal,
};
