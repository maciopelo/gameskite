const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "./.env" });

const PORT = 8080 || process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

/* local db */
const db = mysql.createConnection({
  host: process.env.LOCAL_DB_HOST,
  user: process.env.LOCAL_DB_USER,
  password: process.env.LOCAL_DB_PASSWORD,
  database: process.env.LOCAL_DB_NAME,
});

/* remote db */
// const db = mysql.createConnection({
//   host: process.env.REMOTE_DB_HOST,
//   user: process.env.REMOTE_DB_USER,
//   password: process.env.REMOTE_DB_PASSWORD,
//   database: process.env.REMOTE_DB_NAME,
// });

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected !");
  }
});

app.post("/register", (req, res) => {
  const { email, nick, password } = req.body;

  const query = "INSERT INTO users (nick, email, password) VALUES (?,?,?)";

  db.query(query, [nick, email, password], (err, result) => {
    console.log(err);
    console.log(result);
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
