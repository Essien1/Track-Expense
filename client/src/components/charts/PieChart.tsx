import React from "react";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react"; // Icons for trends

// Define the Expense type
interface Expense {
  amount: number;
  description: string;
  person: string;
  category: string;
}

// Define props type
interface PieChartProps {
  expenses: Expense[];
}

const PieChartComponent: React.FC<PieChartProps> = ({ expenses }) => {
  // Calculate total expenses
  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  // Get stored income from localStorage safely
  const storedData = JSON.parse(localStorage.getItem("financeData") ?? "{}");
  const totalIncome = storedData.income ?? 45000;

  // Calculate savings
  const savings = totalIncome - totalExpense;

  // Dynamic pie chart data
  const data = [
    { name: "Income", value: totalIncome, color: "#16a34a" }, // Green
    { name: "Expense", value: totalExpense, color: "#dc2626" }, // Red
    { name: "Savings", value: savings, color: "#0f172a" }, // Dark Blue
  ];

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Report Overview</h2>
        <button className="text-gray-400 hover:text-gray-600">•••</button>
      </div>

      <div className="flex items-center space-x-4">
        {/* Pie Chart */}
        <div className="w-2/5">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                innerRadius={30}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend and Values */}
        <div className="w-3/5 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full" style={{ background: item.color }}></span>
                <span className="text-gray-600">{item.name}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-800 font-semibold">
                <span>${item.value.toLocaleString()}</span>
                {item.name === "Income" ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChartComponent;
