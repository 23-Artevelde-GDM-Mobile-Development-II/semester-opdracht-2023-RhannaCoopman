const { Pool } = require("pg");

const pool = new Pool({
  user: 'postgres',
  database: 'Immosite',
  password: 'Secret123',
  port: 5432,
  host: 'localhost',
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = pool;
