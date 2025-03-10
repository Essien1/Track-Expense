  import React from "react";

  interface Expense {
    description: string;
    category: string;
    person: string;
    amount: number;
  }

  const RecentExpenses = ({ expenses }: { expenses: Expense[] }) => {
    return (
      <div className="max-h-96 overflow-y-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Recent Expenses</h2>
        <ul className="space-y-3">
          {expenses.map((expense, index) => (
            <li key={index} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-semibold">{expense.description}</p>
                <p className="text-sm text-gray-500">
                  {expense.category} - By: {expense.person}
                </p>
              </div>
              <p className="text-red-500 font-semibold">₦{expense.amount.toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default RecentExpenses;
