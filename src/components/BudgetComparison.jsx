"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const BudgetComparison = ({ transactions }) => {
  const [budgets, setBudgets] = useState([]);

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

  const categorySpending = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const chartData = budgets.map((budget) => ({
    category: budget.category,
    budget: budget.amount,
    spent: categorySpending[budget.category] || 0,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Budget vs Actual Spending</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="budget" fill="#34d399" />
          <Bar dataKey="spent" fill="#f43f5e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetComparison;
