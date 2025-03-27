const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget");

// Get current budget
router.get("/", async (req, res) => {
  try {
    const budget = await Budget.findOne(); // Assuming one budget document
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: "Server error retrieving budget" });
  }
});

// Set budget
router.post("/", async (req, res) => {
  try {
    const { annualBudget, monthlyBudget } = req.body;

    // Validate input
    if (annualBudget === undefined || monthlyBudget === undefined) {
      return res.status(400).json({ message: "Annual and monthly budget are required" });
    }

    // Find or create a single budget document
    let budget = await Budget.findOneAndUpdate(
      {}, // Empty filter to match any document
      { annualBudget, monthlyBudget }, 
      { 
        upsert: true, // Create if not exists
        new: true // Return the updated/created document
      }
    );

    res.json(budget);
  } catch (error) {
    console.error("Error saving budget:", error);
    res.status(500).json({ message: "Error saving budget", error: error.message });
  }
});
module.exports = router;
