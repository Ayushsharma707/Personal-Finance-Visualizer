import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const CATEGORY_COLORS = {
  Food: "#FF6384",
  Transport: "#36A2EB",
  Entertainment: "#FFCE56",
  Shopping: "#4CAF50",
  Bills: "#9C27B0",
  Health: "#FF9800",
  Others: "#607D8B",
};

export default function CategoryChart({ transactions }) {
  const categoryData = transactions.reduce((acc, transaction) => {
    const existingCategory = acc.find((item) => item.name === transaction.category);
    if (existingCategory) {
      existingCategory.value += transaction.amount;
    } else {
      acc.push({ name: transaction.category, value: transaction.amount });
    }
    return acc;
  }, []);

  return (
    <div className="chart-container">
      <h3 className="text-xl font-semibold text-center mb-4">Expenses by Category</h3>
      {categoryData.length === 0 ? (
        <p className="text-center text-gray-600">No transactions to show.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {categoryData.map((entry) => (
                <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || "#999999"} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
