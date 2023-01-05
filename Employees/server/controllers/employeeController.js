import express from "express";
const router = express.Router();

import { db } from "../db.js";

router.get("/", (req, res) => {
  const sqlQuery = "SELECT * FROM employees;";
  db.query(sqlQuery, (err, data) => {
    if (err) console.log(err);
    else res.send(data);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM employees WHERE employees.id= (?);";
  db.query(sqlGet, [id], (err, data) => {
    if (err) return res.status(402).json(err);
    res.send(data);
  });
});

router.put("/:id", (req, res) => {
  const { id, name, age, country, wage, position } = req.body;

  const sqlQuery =
    "UPDATE `employees` SET `name` = ?, `age`=?, `country`=? , `wage`=?, `position`=? WHERE `id` = ?;";
  db.query(sqlQuery, [name, age, country, wage, position, id], (err, data) => {
    if (err) console.log(err);
    else res.send(data);
  });
});

router.post("/", (req, res) => {
  const { id, name, age, country, wage, position } = req.body;
  const sqlQuery =
    "INSERT INTO employees (id,  name , age, country, wage, position) VALUES (?,?,?,?,?,?);";
  db.query(sqlQuery, [id, name, age, country, wage, position], (err, data) => {
    if (err) console.log(err);
    else res.send(data);
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sqlQuery = "DELETE FROM employees WHERE `id`=?;;";
  db.query(sqlQuery, [id], (err, data) => {
    if (err) console.log(err);
    else res.send(data);
  });
});

export default router;
