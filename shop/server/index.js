const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "shop",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM stock";
  db.query(sqlGet, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  const sqlInsert = "INSERT INTO users(email,password) VALUES(?,?)";
  db.query(sqlInsert, [email, password], (err, result) => {
    if (err) console.log(err);
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const sqlSelect = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sqlSelect, [email, password], (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});
/*
app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM contact_db WHERE id = ?";
  db.query(sqlRemove, id, (err, result) => {
    if (err) console.log(err);
  });
});

**/
app.get("/api/get/search/:name", (req, res) => {
  const { name } = req.params;
  const sqlGet = "SELECT * FROM stock WHERE name = ?";
  db.query(sqlGet, name, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.get("/api/get/view/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM stock WHERE id = ?";
  db.query(sqlGet, id, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});
/*
app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, contact } = req.body;
  const sqlUpdate =
    "UPDATE contact_db SET name=?, email =?, contact=? WHERE id = ?";
  db.query(sqlUpdate, [name, email, contact, id], (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
}); */

app.get("/", (req, res) => {
  const sqlInsert =
    "INSERT INTO stock(name,description,imagesrc,price) VALUES('Banana', 'Sweet fresh Bananas', './images/banana.jfif',5)";
  db.query(sqlInsert, (err, result) => {
    if (err) console.log(err);
  });
  res.send("Hello Express");
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
