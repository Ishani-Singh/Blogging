const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Ishanipostgresql811",
    host: "localhost",
    port: 5432,
    database: "blogging"
});

module.exports = pool;