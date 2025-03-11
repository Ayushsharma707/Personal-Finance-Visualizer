"use client";
export default function TransactionList({ transactions, onDelete }) {
  return (
    <ul className="divide-y divide-gray-200">
      {transactions.map((t) => (
        <li key={t._id} className="p-2 flex justify-between">
          <span>{t.description} - ${t.amount}</span>
          <button onClick={() => onDelete(t._id)} className="text-red-500">Delete</button>
        </li>
      ))}
    </ul>
  );
}