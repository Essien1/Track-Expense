  import React, { useEffect, useRef } from "react";
  import {
    HomeIcon,
    PlusCircleIcon,
    WalletIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    QuestionMarkCircleIcon,
    XMarkIcon,
  } from "@heroicons/react/24/outline";
  import { Link, useLocation } from "react-router-dom";

  const Sidebar: React.FC<{ isOpen: boolean; toggleSidebar: (state: boolean) => void }> = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();
    const sidebarRef = useRef<HTMLDivElement | null>(null);

    // Close sidebar when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
          if (isOpen) toggleSidebar(false);
        }
        
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, toggleSidebar]);

    // Close sidebar when navigating to a new page
    useEffect(() => {
      toggleSidebar(false);
    }, [location.pathname, toggleSidebar]);

    return (
      <div className={`fixed inset-0 z-50 transition-all duration-300 md:relative md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div ref={sidebarRef} className="w-64 h-screen shadow-md px-3 py-8 flex flex-col justify-between bg-white text-gray-700">
          <div>
            {/* Sidebar Header */}
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-green-600 flex items-center space-x-3">
                <span className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-semibold">
                  E
                </span>
                <Link to="/">3E</Link>
              </h1>
              <button className="md:hidden text-gray-500 hover:text-gray-700" onClick={() => toggleSidebar(false)}>
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="mt-8 space-y-4">
              {[
                { name: "Dashboard", icon: HomeIcon, path: "/" },
                { name: "Add Expenses", icon: PlusCircleIcon, path: "/add-expenses" },
                { name: "Budget Planner", icon: WalletIcon, path: "/budget-planner" },
                { name: "Reports", icon: ChartBarIcon, path: "/report" },
              ].map(({ name, icon: Icon, path }) => (
                <Link key={name} to={path} className="flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition hover:bg-gray-100 text-gray-700">
                  <Icon className="w-6 h-6 text-gray-500" />
                  <span className="text-base font-medium">{name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Footer Links */}
          <div className="space-y-3">
            {[
              { name: "Settings", icon: Cog6ToothIcon, path: "/settings" },
              { name: "Help", icon: QuestionMarkCircleIcon, path: "/help" },
            ].map(({ name, icon: Icon, path }) => (
              <Link key={name} to={path} className="flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition hover:bg-gray-100 text-gray-700">
                <Icon className="w-6 h-6 text-gray-500" />
                <span className="text-base font-medium">{name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default Sidebar;
