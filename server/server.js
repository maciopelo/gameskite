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

  console.log(req.body)
  
  const { email, nick, password } = req.body;

  const queryNick = "SELECT * FROM users WHERE nick = ?";

  const queryEmail = "SELECT * FROM users WHERE email = ?";

  const queryReg = "INSERT INTO users (nick, email, password) VALUES (?,?,?)";


  db.query(queryNick, [nick], (errNick, resultNick) => {
    if (errNick){
      res.send({err: errNick});
    }
    if(resultNick.length > 0){
      console.log("Username taken")
      res.send({message: "Username taken"});
    }
    else {

      db.query(queryEmail, [email], (errEmail, resultEmail) => {
        if (errEmail){
          res.send({err: errEmail});
        }
        
        if(resultEmail.length > 0){
          console.log("Email taken")
          res.send({message: "Email taken"});
        }
        else {

          db.query(queryReg, [nick, email, password], (errReg, resultReg) => {
          console.log("less goo")
          console.log(errReg);
          console.log(resultReg);
          res.send({message: "Succesfull Registration!"});

          });
        }
      });
    }
  });
});


app.post("/login", (req, res) => {
  const {email, password} = req.body;

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(query, [email, password], (err, result) => {
    if(err) {
      res.send({err: err});
    }

    if(result.length > 0){
      res.send(result);
    }
    else {
      res.send({message: "Wrong username or password"})
    }
      
  
  });
});




app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

