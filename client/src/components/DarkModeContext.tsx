// import React, { createContext, useContext, useEffect, useState } from "react";

// interface DarkModeContextType {
//   darkMode: boolean;
//   toggleDarkMode: () => void;
// }

// const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

// export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [darkMode, setDarkMode] = useState<boolean>(() => {
//     return localStorage.getItem("darkMode") === "true";
//   });

//   useEffect(() => {
//     localStorage.setItem("darkMode", darkMode.toString());
//     document.documentElement.classList.toggle("dark", darkMode);
//   }, [darkMode]);

//   const toggleDarkMode = () => setDarkMode((prev) => !prev);

//   return (
//     <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
//       {children}
//     </DarkModeContext.Provider>
//   );
// };

// export const useDarkMode = () => {
//   const context = useContext(DarkModeContext);
//   if (!context) {
//     throw new Error("useDarkMode must be used within a DarkModeProvider");
//   }
//   return context;
// };

// import React, { useState, useEffect, useRef } from "react";
// import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Report from "./pages/Report";
// import AddExpenseForm from "./components/AddExpenseForm";
// import BudgetPlanner from "./components/BudgetPlanner";
// import Sidebar from "./components/layout/Sidebar";
// import { Expense } from "./types";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import Settings from "./components/Settings";
// // import { DarkModeProvider } from "./components/DarkModeContext";

// function App() {
//   // State for finance data
//   const [expenses, setExpenses] = useState<Expense[]>([]);
//   const [budget, setBudget] = useState({ annualBudget: 0, monthlyBudget: 0 });
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const sidebarRef = useRef<HTMLDivElement | null>(null);
//   const location = useLocation();

//   // Function to add expense
//   const handleAddExpense = (newExpense: Expense) => {
//     setExpenses((prev) => [...prev, newExpense]);
//   };

//   // Function to update budget
//   const handleUpdateBudget = (annualBudget: number, monthlyBudget: number) => {
//     setBudget({ annualBudget, monthlyBudget });
//   };

//   // Close sidebar when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target as Node)
//       ) {
//         setIsSidebarOpen(false);
//       }
//     };

//     if (isSidebarOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isSidebarOpen]);

//   // Close sidebar when navigating to a new page
//   useEffect(() => {
//     setIsSidebarOpen(false);
//   }, [location.pathname]);

//   return (
  
//       <Router>
//         <div className="flex h-screen">
//           {/* Mobile Sidebar Toggle Button */}
//           <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow-md flex items-center justify-between px-4 py-3 z-50">
//             <div className="flex items-center space-x-2">
//               <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-700">
//                 {isSidebarOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
//               </button>
//               <h1 className="text-xl font-bold text-green-500">Tripple E</h1>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div
//             ref={sidebarRef}
//             className={`fixed md:relative bg-white shadow-md h-screen w-64 px-6 py-8 transform ${
//               isSidebarOpen ? "translate-x-0" : "-translate-x-64"
//             } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
//           >
//             <Sidebar isOpen={isSidebarOpen} toggleSidebar={setIsSidebarOpen} />
//           </div>

//           {/* Main Content */}
//           <div className="flex-1 p-6 overflow-y-auto bg-gray-100 mt-14 md:mt-0">
//             <Routes>
//               <Route path="/" element={<Dashboard />} />
//               <Route path="/add-expenses" element={<AddExpenseForm onAddExpense={handleAddExpense} />} />
//               <Route path="/budget-planner" element={<BudgetPlanner onUpdateBudget={handleUpdateBudget} />} />
//               <Route path="/report" element={<Report />} />
//               <Route path="/settings" element={<Settings />} />
//             </Routes>
//           </div>
//         </div>
//       </Router>
 
//   );
// }

// export default App;
