import express from "express";
import { getRelationships, addRelationship, removeRelationship } from "../controlers/relationship.js";

const router = express.Router();

router.get("/", getRelationships);
router.post("/",  addRelationship);
router.delete("/", removeRelationship);

export default router;
