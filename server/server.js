const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const PORT = 8080 || process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
    console.log('Connected !');
  }
});

app.post('/register', (req, res) => {
  console.log(req.body);

  const { email, nick, password } = req.body;

  const queryNick = 'SELECT * FROM users WHERE nick = ?';

  const queryEmail = 'SELECT * FROM users WHERE email = ?';

  const queryReg = 'INSERT INTO users (nick, email, password) VALUES (?,?,?)';

  db.query(queryNick, [nick], (errNick, resultNick) => {
    if (errNick) {
      res.send({ err: errNick });
    }
    if (resultNick.length > 0) {
      res.send({ message: 'Username already exists!' });
    } else {
      db.query(queryEmail, [email], (errEmail, resultEmail) => {
        if (errEmail) {
          res.send({ err: errEmail });
        }

        if (resultEmail.length > 0) {
          res.send({ message: 'Email already used!' });
        } else {
          bcrypt.hash(password, 10, (err, hashedPassword) => {
            console.log(password, hashedPassword);
            console.log(err);
            db.query(
              queryReg,
              [nick, email, hashedPassword],
              (errReg, resultReg) => {
                console.log(errReg);
                console.log(resultReg);
                res.send({ message: 'Succesfull registration!' });
              }
            );
          });
        }
      });
    }
  });
});

app.post('/add_game', (req, res) => {
  console.log(req.body);
  const { image, title, status, rate, nick } = req.body;

  const queryId = 'SELECT id FROM users WHERE nick = ?';
  const insertGameQuery =
    'INSERT INTO Games (image, title, status, rate, users_id) VALUES (?,?,?,?,?)';

  db.query(queryId, [nick], (errId, resultId) => {
    // console.log(resultId[0].id);
    // console.log(errId);
    db.query(
      insertGameQuery,
      [image, title, status, rate, resultId[0].id],
      (errInsert, resultInsert) => {
        console.log(errInsert);
        console.log(resultInsert);
        res.send();
      }
    );
  });
});

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401);

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403);

    req.user = user;
    next();
  });
};

app.get('/check/auth', authenticate, (req, res) => {
  res.send(req.user);
});

app.get('/my-games/:userNick', (req, res) => {
  const nick = req.params.userNick;

  const queryId = 'SELECT id FROM users WHERE nick = ?';
  const takeGames =
    'Select image, title, status, rate FROM Games WHERE users_id = ?';

  db.query(queryId, [nick], (errId, resultId) => {
    db.query(takeGames, [resultId[0].id], (errGames, resultGames) => {
      console.log(resultGames);
      res.send(resultGames);
    });
  });
});

app.post('/login', (req, response) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';

  db.query(query, [email, password], (err, result) => {
    if (err) {
      res.send({ err: err });
      return;
    }

    bcrypt.compare(password, result[0].password, (err, res) => {
      if (res) {
        const id = result[0].id;
        const nick = result[0].nick;
        const token = jwt.sign({ id, nick }, process.env.JWT_SECRET_KEY, {
          expiresIn: 60 * 60 * 24,
        });

        response.send({
          auth: true,
          token: token,
          isLogged: true,
          nick: result[0].nick,
        });
      } else {
        response.send({
          auth: false,
          isLogged: false,
          message: 'Wrong username or password',
        });
      }
    });
  });
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
