import { useState, useEffect } from "react";

const categories = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Other"];

const CategorySelector = ({ category, setCategory, resetCategory }) => {
  const [customCategory, setCustomCategory] = useState("");

  // Reset category input when form is submitted
  useEffect(() => {
    if (resetCategory) {
      setCustomCategory(""); // Clear custom input
      setCategory(""); // Reset dropdown
    }
  }, [resetCategory]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === "Other") {
      setCategory("Other"); // Keep dropdown on "Other"
    } else {
      setCategory(selectedCategory);
      setCustomCategory(""); // Reset custom input when switching back
    }
  };

  const handleCustomCategoryChange = (e) => {
    setCustomCategory(e.target.value); // Update custom category input state
  };

  const handleCustomCategoryBlur = () => {
    // Update category only when the user finishes typing
    if (customCategory.trim() !== "") {
      setCategory(customCategory); // Set custom category
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium">Category:</label>
      <select
        value={category === "Other" ? "Other" : category}
        onChange={handleCategoryChange}
        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select a Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Show input field when "Other" is selected */}
      {category === "Other" && (
        <input
          type="text"
          placeholder="Enter custom category"
          value={customCategory}
          onChange={handleCustomCategoryChange}
          onBlur={handleCustomCategoryBlur} // Update category only on blur
          className="mt-2 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  );
};

export default CategorySelector;
