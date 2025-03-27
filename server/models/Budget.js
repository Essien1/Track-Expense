const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
  annualBudget: { type: Number, required: true },
  monthlyBudget: { type: Number, required: true },
});

const Budget = mongoose.model("Budget", BudgetSchema);
module.exports = Budget;
