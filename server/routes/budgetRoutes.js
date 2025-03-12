const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget"); // Ensure correct path

// Get all budgets
router.get("/", async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a budget
router.post("/", async (req, res) => {
  try {
    const { amount, description, person, category } = req.body;
    const newBudget = new Budget({ amount, description, person, category });
    const savedBudget = await newBudget.save();
    res.status(201).json(savedBudget);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
