import React, { useState } from "react";
import { Expense } from "../types";

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



// interface Expense {
//   amount: string;
//   description: string;
//   person: string;
//   category: string;
//   date: string;
// }

interface AddExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ onAddExpense }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [person, setPerson] = useState(people[0]);
  const [category, setCategory] = useState(categories[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;
    
    onAddExpense({ 
      amount: parseFloat(amount),
      description, 
      person, 
      category, 
      date: new Date().toISOString() 
    });
  
    setAmount("");
    setDescription("");
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <select 
        value={person} 
        onChange={(e) => setPerson(e.target.value)}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        {people.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <button 
        type="submit" 
        className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition"
      >
        Add Expense
      </button>
    </form>
  );
};

export default AddExpenseForm;