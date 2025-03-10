import React, { useState, useEffect } from "react";
import MeritsCards from "../components/MeritsCards";
import BarChartComponent from "../components/charts/BarChart";
import PieChartComponent from "../components/charts/PieChart";
import LineChartComponent from "../components/charts/LineChart";
import RecentExpenses from "../components/RecentExpenses";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetPlanner from "../components/BudgetPlanner"; 
import { Expense } from "../types";
// import { useDarkMode } from "../components/DarkModeContext";

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

  // const { darkMode } = useDarkMode();
  const [showExpenseForm, _setShowExpenseForm] = useState(false);
  const [showBudgetPlanner, _setShowBudgetPlanner] = useState(false);

  const [data, setData] = useState<FinanceData>(() => {
    const savedData = localStorage.getItem("financeData");
    const savedBudget = JSON.parse(localStorage.getItem("budgetData") || "{}");
    return savedData
      ? { 
          ...JSON.parse(savedData), 
          income: savedBudget.monthlyBudget || 0, 
          annualBudget: savedBudget.annualBudget || 0, 
          monthlyBudget: savedBudget.monthlyBudget || 0 
        }
      : {
          income: savedBudget.monthlyBudget || 0,
          expense: 0,
          savings: 0,
          mostSpending: { category: "N/A", amount: 0, description: "", person: "", date: "" },
          expenses: [],
          annualBudget: savedBudget.annualBudget || 0,
          monthlyBudget: savedBudget.monthlyBudget || 0,
        };
  });

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    setData((prev) => ({ ...prev, expenses: savedExpenses }));
  }, []);

  useEffect(() => {
    localStorage.setItem("financeData", JSON.stringify(data));
  }, [data]);

  const handleAddExpense = (expense: Expense) => {
    setData((prev) => {
      const updatedExpenses = [expense, ...prev.expenses];
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      return {
        ...prev, 
        expenses: updatedExpenses,
        expense: prev.expense + expense.amount,
        savings: prev.income - (prev.expense + expense.amount),
        mostSpending: updatedExpenses.length
          ? updatedExpenses.reduce((max, exp) => (exp.amount > max.amount ? exp : max), expense)
          : expense,
      };
    });
  };

  return (
    <div className="flex flex-col p-4 md:p-6 bg-gray-50 min-h-screen">
      {showExpenseForm ? (
        <AddExpenseForm onAddExpense={handleAddExpense} />
      ) : showBudgetPlanner ? (
        <BudgetPlanner onUpdateBudget={(annualBudget, monthlyBudget) => {
          localStorage.setItem("budgetData", JSON.stringify({ annualBudget, monthlyBudget }));
          setData((prev) => ({
            ...prev,
            income: monthlyBudget,
            annualBudget,
            monthlyBudget,
            savings: monthlyBudget - prev.expense,
          }));
        }} />
      ) : (
        <>
          <div className="
          ">
            <MeritsCards
              income={data.income}
              expense={data.expense}
              savings={data.savings}
              mostSpending={data.mostSpending}
            />
          </div>

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