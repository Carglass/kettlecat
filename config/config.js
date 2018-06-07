// require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_DVPT_USER,
    password: process.env.DB_DVPT_PASS,
    database: process.env.DB_DVPT_DB,
    host: process.env.DB_DVPT_HOST,
    port: process.env.DB_DVPT_PORT,
    dialect: "mysql"
  },
  test: {
    username: process.env.DB_DVPT_USER,
    password: process.env.DB_DVPT_PASS,
    database: process.env.DB_DVPT_DB,
    host: process.env.DB_DVPT_HOST,
    port: process.env.DB_DVPT_PORT,
    dialect: "mysql"
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
};
