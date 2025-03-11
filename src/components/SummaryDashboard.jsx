"use client";

import { useState } from "react";
import CategoryChart from "./CategoryChart";

export default function SummaryDashboard({ transactions, onEdit, onDelete }) {
  const [hoveredTransaction, setHoveredTransaction] = useState(null);

  if (!transactions || transactions.length === 0) {
    return <p className="text-center text-gray-600">No transactions available</p>;
  }

  const totalExpenses = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const latestTransactions = transactions.slice(-5).reverse(); // Get last 5 transactions

  return (
    <div className="dashboard-container">
      {/* Total Expenses Card */}
      <div className="summary-card">
        <h3 className="text-xl font-semibold">Total Expenses</h3>
        <p className="text-2xl font-bold text-red-600">₹{totalExpenses.toFixed(2)}</p>
      </div>

      {/* Category Pie Chart */}
      <CategoryChart transactions={transactions} />

      {/* Recent Transactions with Hover Actions */}
      <div className="recent-transactions">
        <h3 className="text-lg font-semibold mt-6">Recent Transactions</h3>
        <ul className="transaction-list">
          {latestTransactions.map((t) => (
            <li
              key={t._id}
              className="transaction-item"
              onMouseEnter={() => setHoveredTransaction(t._id)}
              onMouseLeave={() => setHoveredTransaction(null)}
            >
              <span className="date">{new Date(t.date).toISOString().split("T")[0]}</span> 
              - <span className="desc">{t.description}</span> 
              - <span className="amount text-red-500">₹{t.amount}</span>

              {/* Edit & Delete buttons appear on hover */}
              {hoveredTransaction === t._id && (
                <div className="transaction-buttons">
                  <button onClick={() => onEdit(t)} className="edit-btn">✏️</button>
                  <button onClick={() => onDelete(t._id)} className="delete-btn">🗑️</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
