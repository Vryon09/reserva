import express from "express";
import {
  addTable,
  deleteTable,
  getAllTables,
  updateTable,
} from "../controllers/tablesController.js";

const router = express.Router();

router.get("/", getAllTables);

router.post("/", addTable);

router.patch("/:id", updateTable);

router.delete("/:id", deleteTable);

export default router;
