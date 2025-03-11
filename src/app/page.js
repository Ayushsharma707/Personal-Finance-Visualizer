"use client";

import { useState, useEffect } from "react";
import TransactionForm from "@/components/TransactionForm";
import ExpensesChart from "@/components/ExpensesChart";
import SummaryDashboard from "@/components/SummaryDashboard";
import CategoryChart from "@/components/CategoryChart";


const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch("/api/transactions");
      const data = await response.json();
      setTransactions(data);
    };
    fetchTransactions();
  }, []);

  const addTransaction = async (transaction) => {
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    });
    const newTransaction = await response.json();
    setTransactions((prev) => [...prev, newTransaction]);
  };

  const updateTransaction = async (transaction) => {
    const response = await fetch("/api/transactions", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    });

    if (response.ok) {
      const updatedTransaction = await response.json();
      setTransactions((prev) =>
        prev.map((item) => (item._id === updatedTransaction._id ? updatedTransaction : item))
      );
      setEditTransaction(null);
    }
  };

  const deleteTransaction = async (id) => {
    await fetch("/api/transactions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTransactions((prev) => prev.filter((transaction) => transaction._id !== id));
  };

return (
  <div className="container mx-auto p-6">
    {/* Transaction Form */}
    <TransactionForm
      onSubmit={editTransaction ? updateTransaction : addTransaction}
      transaction={editTransaction}
    />

    {/* Dashboard with Category Pie Chart & Summary */}
    <SummaryDashboard transactions={transactions}       onEdit={setEditTransaction} 
      onDelete={deleteTransaction} />

    {/* Monthly Expenses Chart */}
    <ExpensesChart transactions={transactions} />

    {/* Transactions List with Edit & Delete Options */}
    <ul className="transaction-list">
      {transactions.map((transaction) => (
        <li key={transaction._id} className={`transaction-item ${transaction.amount >= 0 ? "transaction-income" : "transaction-expense"}`}>
          <div className="transaction-details">
            <p className="transaction-amount">₹{Math.abs(transaction.amount)}</p>
            <p className="transaction-date">
              {new Date(transaction.date).toISOString().split("T")[0]} - {transaction.description}
            </p>
            <p className="transaction-category">
              Category: <strong>{transaction.category || "Uncategorized"}</strong>
            </p>
          </div>

          {/* Edit & Delete Buttons */}
          <div className="transaction-buttons">
            <button onClick={() => setEditTransaction(transaction)} className="edit-btn">✏️ Edit</button>
            <button onClick={() => deleteTransaction(transaction._id)} className="delete-btn">🗑️ Delete</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);


};

export default Home;
