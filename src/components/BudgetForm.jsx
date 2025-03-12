"use client";

import { useState, useEffect } from "react";

const BudgetForm = () => {
  const [budgets, setBudgets] = useState([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchBudgets = async () => {
      const res = await fetch("/api/budgets");
      if (res.ok) {
        const data = await res.json();
        setBudgets(data);
      }
    };
    fetchBudgets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category, amount: Number(amount) }),
    });

    if (res.ok) {
      const newBudget = await res.json();
      setBudgets([...budgets, newBudget]);
      setCategory("");
      setAmount("");
    } else {
      alert("Budget already exists for this category!");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Set Monthly Budget</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full mb-2"
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded w-full mb-2"
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Set Budget</button>
      </form>

      <ul className="mt-4">
        {budgets.map((b) => (
          <li key={b._id} className="p-2 border-b">
            {b.category}: ₹{b.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetForm;
