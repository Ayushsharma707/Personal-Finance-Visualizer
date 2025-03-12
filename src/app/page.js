"use client";

import { useState, useEffect, useRef } from "react";
import TransactionForm from "@/components/TransactionForm";
import ExpensesChart from "@/components/ExpensesChart";
import SummaryDashboard from "@/components/SummaryDashboard";
import CategoryChart from "@/components/CategoryChart";
import BudgetForm from "@/components/BudgetForm"; // ✅ New - Budget Form Component
import BudgetComparison from "@/components/BudgetComparison"; // ✅ New - Budget Comparison Chart

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false); // State for scroll button visibility

  const formRef = useRef(null); // Ref for the form

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch("/api/transactions");
      const data = await response.json();
      setTransactions(data);
    };
    fetchTransactions();
  }, []);

  useEffect(() => {
    // Scroll to the form when an edit is triggered
    if (editTransaction) {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [editTransaction]);

  // Scroll event listener to show/hide the button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) { // Show button after 200px scroll
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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

  // Function to handle scroll-to-top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto p-6">
      {/* Transaction Form */}
      <div ref={formRef}>
        <TransactionForm
          onSubmit={editTransaction ? updateTransaction : addTransaction}
          transaction={editTransaction}
        />
      </div>

      {/* Budget Form - Set Monthly Budgets per Category */}
      <BudgetForm /> 

      {/* Dashboard with Category Pie Chart & Summary */}
      <SummaryDashboard 
        transactions={transactions} 
        onEdit={setEditTransaction} 
        onDelete={deleteTransaction} 
      />

      {/* Monthly Expenses Chart */}
      <ExpensesChart transactions={transactions} />

      {/* Budget vs Actual Spending Chart */}
      <BudgetComparison transactions={transactions} />

      {/* Transactions List with Edit & Delete Options */}
      <ul className="transaction-list">
        {transactions.map((transaction) => (
          <li 
            key={transaction._id} 
            className={`transaction-item ${transaction.amount >= 0 ? "transaction-income" : "transaction-expense"}`}
          >
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

      {/* Scroll-to-Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top-btn fixed bottom-0 right-0 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default Home;
