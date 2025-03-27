import { useState, useEffect } from "react";
import axios from "axios";

const BudgetPlanner = ({
  onUpdateBudget,
}: {
  onUpdateBudget: (annualBudget: number, monthlyBudget: number) => void;
}) => {
  const [annualBudget, setAnnualBudget] = useState<number>(0);
  const [monthlyBudget, setMonthlyBudget] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [savedAnnualBudget, setSavedAnnualBudget] = useState<number>(0);
  const [savedMonthlyBudget, setSavedMonthlyBudget] = useState<number>(0);

  // API Base URL
  const API_URL = "http://localhost:5000/api";

  // Fetch budget & expenses from backend when component mounts
  useEffect(() => {
    const fetchBudgetAndExpenses = async () => {
      try {
        // Fetch budget from backend
        const budgetRes = await axios.get(`${API_URL}/budget`);
        if (budgetRes.data) {
          setSavedAnnualBudget(budgetRes.data.annualBudget);
          setSavedMonthlyBudget(budgetRes.data.monthlyBudget);
        }

        // Fetch total expenses from backend
        const expensesRes = await axios.get(`${API_URL}/expenses`);
        const totalSpent = expensesRes.data.reduce(
          (sum: number, expense: any) => sum + expense.amount,
          0
        );
        setTotalExpenses(totalSpent);
      } catch (error) {
        console.error("Error fetching budget/expenses:", error);
      }
    };

    fetchBudgetAndExpenses();
  }, []);

  // Save budget to backend
  const saveBudget = async () => {
    try {
    console.log('annualBudget', annualBudget);
    console.log('monthlyBudget', monthlyBudget);
      await axios.post(`${API_URL}/budget`, {
        annualBudget,
        monthlyBudget,
      });

      // Update UI
      setSavedAnnualBudget(annualBudget);
      setSavedMonthlyBudget(monthlyBudget);
      onUpdateBudget(annualBudget, monthlyBudget);
      alert("Budget saved successfully!");
      setAnnualBudget(0);
      setMonthlyBudget(0);
    } catch (error) {
      console.error("Error saving budget:", error);
    }
  };

  // Calculate spending status
  const isOverspending = totalExpenses > savedMonthlyBudget;
  const spendingStatus = isOverspending ? "⚠️ Over Budget" : "✅ Within Budget";
  const spendingColor = isOverspending ? "text-red-500" : "text-green-500";

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Budget Planner</h2>

      {/* Budget Display Container */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-medium mb-2">Current Budget</h3>
        <p className="text-gray-700">
  <span className="font-semibold">Monthly Budget:</span> ₦
  {(savedMonthlyBudget || 0).toLocaleString()}
</p>
<p className="text-gray-700">
  <span className="font-semibold">Annual Budget:</span> ₦
  {(savedAnnualBudget || 0).toLocaleString()}
</p>

      </div>

      {/* Input Fields */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium">
          Annual Budget
        </label>
        <input
          type="number"
          value={annualBudget || ""}
          onChange={(e) => setAnnualBudget(Number(e.target.value))}
          className="w-full p-2 border rounded-md"
          placeholder="Enter your annual budget"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium">
          Monthly Budget
        </label>
        <input
          type="number"
          value={monthlyBudget || ""}
          onChange={(e) => setMonthlyBudget(Number(e.target.value))}
          className="w-full p-2 border rounded-md"
          placeholder="Enter your monthly budget"
        />
      </div>

      <button
        onClick={saveBudget}
        className="bg-green-600 text-white px-4 py-2 rounded-md mt-2 hover:bg-green-700 w-64"
      >
        Save Budget
      </button>

      {/* Spending Status */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-medium">Current Spending Status</h3>
        <p className="text-gray-700">
          <span className="font-semibold">Total Expenses:</span> ₦
          {totalExpenses.toLocaleString()}
        </p>
        <p className={`text-lg font-semibold ${spendingColor}`}>
          {spendingStatus}
        </p>
      </div>
    </div>
  );
};

export default BudgetPlanner;
