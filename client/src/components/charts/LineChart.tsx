import React from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Expense } from "../../types"; // Import the global type

interface LineChartProps {
  expenses: Expense[];
}

const LineChartComponent: React.FC<LineChartProps> = ({ expenses }) => {
  // Group expenses by date
  const groupedExpenses = expenses.reduce<Record<string, number>>((acc, expense) => {
    const date = new Date(expense.date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    acc[date] = (acc[date] || 0) + expense.amount;
    return acc;
  }, {});

  // Convert object to array for Recharts
  const data = Object.entries(groupedExpenses).map(([date, value]) => ({ name: date, value }));

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-2">Expense Activity</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" tick={{ fill: "#6b7280" }} />
          <YAxis tick={{ fill: "#6b7280" }} domain={[0, "auto"]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#22c55e"
            strokeWidth={2}
            dot={{ r: 6, stroke: "#22c55e", strokeWidth: 2, fill: "white" }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
