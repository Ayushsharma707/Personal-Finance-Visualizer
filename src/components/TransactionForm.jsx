"use client";
import { useState, useEffect } from "react";
import CategorySelector from "./CategorySelector";

const TransactionForm = ({ onSubmit, transaction }) => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [resetCategory, setResetCategory] = useState(false);
  useEffect(() => {
    if (transaction) {
      setAmount(transaction.amount || "");
      setDate(transaction.date || "");
      setDescription(transaction.description || "");
      setCategory(transaction.category || "");
    }
  }, [transaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || !date || !description || !category) {
      alert("All fields are required!");
      return;
    }

    const updatedTransaction = {
      _id: transaction?._id, 
      amount: parseFloat(amount),
      date,
      description,
      category
    };

    onSubmit(updatedTransaction);
    setAmount("");
    setDate("");
    setDescription("");
    setCategory("");
    setResetCategory(true); // Reset category selector
    setTimeout(() => setResetCategory(false), 200); 
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-4">{transaction ? "Edit Transaction" : "Add Transaction"}</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
      </div>
      <div className="mb-4">
        <CategorySelector category={category} setCategory={setCategory} resetCategory={resetCategory} />
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
        {transaction ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;
