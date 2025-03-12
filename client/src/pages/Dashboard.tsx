import React, { useState, useEffect } from "react";
import MeritsCards from "../components/MeritsCards";
import BarChartComponent from "../components/charts/BarChart";
import PieChartComponent from "../components/charts/PieChart";
import LineChartComponent from "../components/charts/LineChart";
import RecentExpenses from "../components/RecentExpenses";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetPlanner from "../components/BudgetPlanner"; 
import { Expense } from "../types";
import axios from "axios";

interface FinanceData {
  income: number;
  expense: number;
  savings: number;
  mostSpending: Expense;
  expenses: Expense[];
  annualBudget: number;
  monthlyBudget: number;
}

const Dashboard: React.FC = () => {
  const [showExpenseForm, _setShowExpenseForm] = useState(false);
  const [showBudgetPlanner, _setShowBudgetPlanner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<FinanceData>({
    income: 0,
    expense: 0,
    savings: 0,
    mostSpending: { category: "N/A", amount: 0, description: "", person: "", date: "" },
    expenses: [],
    annualBudget: 0,
    monthlyBudget: 0,
  });

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        const expensesResponse = await axios.get("https://track-expense.onrender.com/api/expenses");
        const budgetResponse = await axios.get("https://track-expense.onrender.com/api/budget");

        const expenses = expensesResponse.data;
        const totalExpense = expenses.reduce((sum: number, exp: Expense) => sum + exp.amount, 0);
        const mostSpending = expenses.length
          ? expenses.reduce((max: Expense, exp: Expense) => (exp.amount > max.amount ? exp : max), expenses[0])
          : { category: "N/A", amount: 0, description: "", person: "", date: "" };

        setData({
          income: budgetResponse.data.monthlyBudget || 0,
          expense: totalExpense,
          savings: (budgetResponse.data.monthlyBudget || 0) - totalExpense,
          mostSpending,
          expenses,
          annualBudget: budgetResponse.data.annualBudget || 0,
          monthlyBudget: budgetResponse.data.monthlyBudget || 0,
        });
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to fetch data");
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFinanceData();
  }, []);

  const handleAddExpense = async (expense: Expense) => {
    try {
      const response = await axios.post("https://track-expense.onrender.com/api/expenses", expense);
      const newExpense = response.data;

      setData((prev) => {
        const updatedExpenses = [newExpense, ...prev.expenses];
        return {
          ...prev,
          expenses: updatedExpenses,
          expense: prev.expense + newExpense.amount,
          savings: prev.income - (prev.expense + newExpense.amount),
          mostSpending: updatedExpenses.length
            ? updatedExpenses.reduce((max, exp) => (exp.amount > max.amount ? exp : max), newExpense)
            : newExpense,
        };
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to add expense");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleUpdateBudget = async (annualBudget: number, monthlyBudget: number) => {
    try {
      await axios.post("https://track-expense.onrender.com/api/budget", { annualBudget, monthlyBudget });
      setData((prev) => ({
        ...prev,
        income: monthlyBudget,
        annualBudget,
        monthlyBudget,
        savings: monthlyBudget - prev.expense,
      }));
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to update budget");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col p-4 md:p-6 bg-gray-50 min-h-screen">
      {showExpenseForm ? (
        <AddExpenseForm onAddExpense={handleAddExpense} />
      ) : showBudgetPlanner ? (
        <BudgetPlanner onUpdateBudget={handleUpdateBudget} />
      ) : (
        <>
          <MeritsCards
            income={data.income}
            expense={data.expense}
            savings={data.savings}
            mostSpending={data.mostSpending}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <BarChartComponent expenses={data.expenses} />
            <RecentExpenses expenses={data.expenses} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <PieChartComponent expenses={data.expenses} />
            <LineChartComponent expenses={data.expenses} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
