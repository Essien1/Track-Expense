const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
  amount: Number,
  description: String,
  person: String,
  category: String
});

module.exports = mongoose.model("Budget", BudgetSchema);
