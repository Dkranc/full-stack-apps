import express from "express";
import { getLikes, addLike, removeLike } from "../controlers/like.js";

const router = express.Router();

router.get("/", getLikes);
router.post("/", addLike);
router.delete("/", removeLike);

export default router;
