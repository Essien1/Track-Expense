import React from "react";
import { Expense } from "../types";

interface MeritsCardsProps {
  income: number;
  expense: number;
  savings: number;
  mostSpending: Expense;
}


const MeritsCards: React.FC<MeritsCardsProps> = ({ income, expense, savings, mostSpending }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
  {/* Total Income Card */}
  <div className="bg-white p-4 md:p-6 rounded-xl border-2 border-gray-300 shadow-md">
    <h3 className="text-gray-600 text-xs md:text-sm font-medium">💰 Total Income</h3>
    <p className="text-lg md:text-2xl font-bold">₦{income}</p>
  </div>

  {/* Total Expense Card */}
  <div className="bg-green-500 text-white p-4 md:p-6 rounded-xl border-2 border-gray-300 shadow-md">
    <h3 className="text-xs md:text-sm font-medium">👜 Total Expense</h3>
    <p className="text-lg md:text-2xl font-bold">₦{expense}</p>
  </div>

  {/* Total Savings Card */}
  <div className="bg-white p-4 md:p-6 rounded-xl border-2 border-gray-300 shadow-md">
    <h3 className="text-gray-600 text-xs md:text-sm font-medium">🐷 Total Savings</h3>
    <p className="text-lg md:text-2xl font-bold">₦{savings}</p>
  </div>

  {/* Most Spending Card */}
  <div className="bg-white p-4 md:p-6 rounded-xl border-2 border-gray-300 shadow-md">
    <h3 className="text-gray-600 text-xs md:text-sm font-medium">🍽️ Most Spending</h3>
    <p className="text-lg md:text-2xl font-bold">₦{mostSpending.amount}</p>
    <p className="text-[10px] md:text-xs text-gray-500">Most spent on {mostSpending.category || "N/A"}</p>
  </div>
</div>
  );
};

export default MeritsCards;
