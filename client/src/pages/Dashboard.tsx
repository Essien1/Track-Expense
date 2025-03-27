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
  // annualBudget: number;
  // monthlyBudget: number;
}

const Dashboard: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<FinanceData>({
    income: 0,
    expense: 0,
    savings: 0,
    mostSpending: { category: "N/A", amount: 0, description: "", person: "", date: "" },
    expenses: [],
    // annualBudget: 0,
    // monthlyBudget: 0,
  });

  const fetchFinanceData = async () => {
    try {
      const [expensesResponse, budgetResponse] = await Promise.all([
        axios.get("https://track-expense.onrender.com/api/expenses"),
        axios.get("https://track-expense.onrender.com/api/budget"),
      ]);
  
      console.log('budget response', budgetResponse);
  
      // Normalize budget data
      const budgetData = Array.isArray(budgetResponse.data) 
        ? budgetResponse.data[0] 
        : budgetResponse.data;
  
      const expenses = expensesResponse?.data || [];
      const totalExpense = expenses.reduce((sum: number, exp: Expense) => sum + exp.amount, 0);
      
      const mostSpending = expenses.length
        ? expenses.reduce((max: Expense, exp: Expense) => (exp.amount > max.amount ? exp : max), expenses[0])
        : { category: "N/A", amount: 0, description: "", person: "", date: "" };
  
      const newData = {
        income: budgetData?.monthlyBudget || 0,
        expense: totalExpense || 0,
        savings: (budgetData?.monthlyBudget - totalExpense) || 0,
        mostSpending: mostSpending,
        expenses: expenses,
        annualBudget: budgetData?.annualBudget || 0,
        monthlyBudget: budgetData?.monthlyBudget || 0,
      };
  
      setData(newData);
      console.log("Updated Data State:", newData);
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

  // useEffect(() => {
  //   fetchFinanceData();
  // }, []);

  useEffect(() => {
    fetchFinanceData();
    console.log("Fetching data...");
  }, []);
  
  // Debugging: Log updated finance data when it changes
  useEffect(() => {
    console.log("Received Props:", data.income, data.expense, data.savings, data.mostSpending, data.expenses);
  }, [data.income, data.expense, data.savings, data.mostSpending, data.expenses]);
  
  useEffect(() => {
    console.log("Data updated:", data);
  }, [data]);

    const handleAddExpense = async (expense: Expense) => {
      try {
        console.log('Expense', expense);
        const response = await axios.post("https://track-expense.onrender.com/api/expenses", expense);
        console.log(response);

        fetchFinanceData();
      } catch (err: unknown) {
        console.log('Error', err);
        setError("Failed to add expense");
      }
    };

  const handleUpdateBudget = async (annualBudget: number, monthlyBudget: number) => {
    try {
      await axios.post("https://track-expense.onrender.com/api/budget", { annualBudget, monthlyBudget });
      fetchFinanceData();
    } catch (err: unknown) {
      setError("Failed to update budget");
    }
  };

  console.log("Active Tab:", activeTab);


  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col p-4 md:p-6 bg-gray-50 min-h-screen">
      {activeTab === "add-expense" ? (
        <AddExpenseForm onAddExpense={handleAddExpense} />
      ) : activeTab === "budget-planner" ? (
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
            <PieChartComponent expenses={data.expenses} income={data.income} />
            <LineChartComponent expenses={data.expenses}  />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
