'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function ExpensesChart({ transactions }) {
  console.log('Received transactions:', transactions);

  if (!Array.isArray(transactions)) {
    transactions = [];
  }

  // Process transactions to group by month
  const data = transactions.length > 0 
    ? transactions.reduce((acc, transaction) => {
        const date = new Date(transaction.date);
        const month = date.toLocaleString('default', { month: 'short' });

        const existingMonth = acc.find((item) => item.name === month);
        if (existingMonth) {
          existingMonth.amount += transaction.amount;
        } else {
          acc.push({ name: month, amount: transaction.amount });
        }
        return acc;
      }, [])
      .sort((a, b) => new Date(`1 ${a.name}`) - new Date(`1 ${b.name}`)) // Ensure correct month order
    : [];

  console.log('Processed data for chart:', data);

  return (
    <div className="chart-container">
      {data.length === 0 ? (
        <p className="chart-placeholder">📊 No transactions available to display.</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#6366f1" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
