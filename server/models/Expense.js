const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  amount: Number,
  description: String,
  person: String,
  category: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Expense", ExpenseSchema);
