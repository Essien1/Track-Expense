import React, { useState } from "react";
// import axios from "axios";

const people = ["Ekpenyong", "Grace", "Essien", "Caleb", "Alexis", "Shaun"];
const categories = [
  "Travels/Transportation",
  "School",
  "Utilities",
  "Financial Support",
  "Rent",
  "Fuel /Car Maintenance",
  "Entertainment",
  "Snacks",
  "Others",
];

const AddExpenseForm = ({ onAddExpense }: { onAddExpense: (expense: any) => void }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [person, setPerson] = useState(""); // No default selection
  const [category, setCategory] = useState(""); // No default selection

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!person || !category) {
      alert("Please select a person and category.");
      return;
    }

    const newExpense = {
      amount: parseFloat(amount),
      description,
      person,
      category,
      date: new Date().toLocaleDateString(),
    };

    const existingExpenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    const updatedExpenses = [newExpense, ...existingExpenses];

    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    onAddExpense(newExpense);

    setAmount("");
    setDescription("");
    setPerson(""); // Reset selection
    setCategory(""); // Reset selection
  };

  return (
    <div className="mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Add New Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border rounded-md"
          required
        />

        {/* Person Dropdown */}
        <select
          value={person}
          onChange={(e) => setPerson(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="" disabled>
            Select Person
          </option>
          {people.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
