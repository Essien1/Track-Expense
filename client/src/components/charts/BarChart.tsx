import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Expense } from "../../types"; // Import the global type

interface BarChartProps {
  expenses: Expense[];
}

const BarChartComponent: React.FC<BarChartProps> = ({ expenses }) => {
  // Group expenses by category
  const groupedExpenses = expenses.reduce<Record<string, number>>((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  // Convert object to array and sort to get the top 5 highest spending
  const data = Object.entries(groupedExpenses)
    .map(([name, amount]) => ({ name, amount }))
    .sort((a, b) => b.amount - a.amount) // Ensure TypeScript recognizes `amount` as number
    .slice(0, 5);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-2">Top 5 Expense Source</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#22c55e" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
