import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id= ?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(402).json(err);

    const { password, ...info } = data[0];
    return res.json(info);
  });
};
