import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Expense } from "../types";

const Report: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  // Load expenses from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("financeData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setExpenses(parsedData.expenses || []);
    }
  }, []);

  // Filter expenses by month and year
  useEffect(() => {
    if (!selectedMonth && !selectedYear) {
      setFilteredExpenses(expenses);
      return;
    }

    const filtered = expenses.filter((expense) => {
      const date = new Date(expense.date);
      const expenseMonth = (date.getMonth() + 1).toString().padStart(2, "0");
      const expenseYear = date.getFullYear().toString();
      
      return (
        (selectedMonth ? expenseMonth === selectedMonth : true) &&
        (selectedYear ? expenseYear === selectedYear : true)
      );
    });

    setFilteredExpenses(filtered);
  }, [selectedMonth, selectedYear, expenses]);

  // Download report as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Transaction Report", 14, 15);
    
    autoTable(doc, {
      startY: 20,
      head: [["Date", "Category", "Amount", "Person", "Description"]],
      body: filteredExpenses.map((expense) => [
        new Date(expense.date).toLocaleDateString(),
        expense.category,
        `$${expense.amount.toFixed(2)}`,
        expense.person,
        expense.description,
      ]),
    });
  
    doc.save("transaction_report.pdf");
  };
  

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Transaction Report</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="">Select Month</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <option key={month} value={month.toString().padStart(2, "0")}>
              {new Date(0, month - 1).toLocaleString("en-US", { month: "long" })}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="">Select Year</option>
          {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Date</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Person</th>
              <th className="border p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense, index) => (
                <tr key={index} className="border">
                  <td className="border p-2">{new Date(expense.date).toLocaleDateString()}</td>
                  <td className="border p-2">{expense.category}</td>
                  <td className="border p-2 text-right">${expense.amount.toFixed(2)}</td>
                  <td className="border p-2">{expense.person}</td>
                  <td className="border p-2">{expense.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="border p-2 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Download Button */}
      <button
        onClick={downloadPDF}
        className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default Report;
