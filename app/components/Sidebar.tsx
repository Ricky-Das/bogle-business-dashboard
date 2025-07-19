import React from "react";
import { Link, useLocation } from "react-router";

const navItems = [
  { label: "Dashboard", to: "/" },
  { label: "Payments", to: "#" },
  { label: "Transactions", to: "#" },
  { label: "Payouts", to: "#" },
  { label: "Reports", to: "#" },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-56 bg-white shadow-md flex flex-col min-h-screen sticky top-0">
      <div className="p-6 text-2xl font-extrabold text-gray-900">Fintech</div>
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.label}
              to={item.to}
              className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <Link
          to="#"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Settings
        </Link>
      </div>
    </aside>
  );
};
