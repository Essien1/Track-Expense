const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true }, // Ensure number type
  description: { type: String, required: true },
  person: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true }
});

module.exports = mongoose.model("Expense", ExpenseSchema);
