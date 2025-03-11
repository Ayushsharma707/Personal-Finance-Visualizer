# 💰 Personal Finance Visualizer  

A modern **expense tracking** web application that allows users to **add, edit, delete, and categorize financial transactions** while providing **insights using visual charts**.

![Personal Finance Visualizer](https://via.placeholder.com/1000x300?text=Personal+Finance+Visualizer) <!-- Replace with actual image -->

---

## 🚀 Features  

- ✅ **Add, Edit & Delete Transactions** – Manage your financial data efficiently.  
- ✅ **Category-Based Pie Chart** – Visualize expenses by category.  
- ✅ **Monthly Expense Chart** – Track spending trends over time.  
- ✅ **Summary Dashboard** – View total expenses and recent transactions.  
- ✅ **Hover Actions** – Edit/Delete options appear on hover in the recent transactions list.  
- ✅ **Responsive UI** – Works on desktop & mobile devices.  

---

## 🛠️ Tech Stack  

| **Technology** | **Usage** |
|--------------|-----------|
| **Next.js** | Frontend framework |
| **React.js** | Component-based UI |
| **Tailwind CSS** | Styling & responsiveness |
| **MongoDB** | Database for storing transactions |
| **Mongoose** | ODM for MongoDB |
| **Recharts** | Data visualization (Pie & Bar Charts) |

---

## 📸 Screenshots  

| **Dashboard** | **Category Chart** |
|------------|---------------|
| ![Dashboard](https://via.placeholder.com/500x300?text=Dashboard) | ![Category Chart](https://via.placeholder.com/500x300?text=Category+Chart) |

---

## 🔧 Installation & Setup  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/Ayushsharma707/Personal-Finance-Visualizer.git
cd Personal-Finance-Visualizer 
```
### **2️⃣ Install Dependencies**  
```bash
npm install
```
### **3️⃣ Setup Environment Variables**  
Create a `.env.local` file in the root directory and add your MongoDB connection string:  

```ini
MONGODB_URI=your_mongodb_connection_string
```
### **4️⃣ Start the Development Server**  
```bash
npm run dev
Now, open http://localhost:3000 in your browser.
```

### **📂 Folder Structure**  

```graphql
📂 src
 ├── 📂 components        # UI components (TransactionForm, Charts, Dashboard)
 ├── 📂 lib               # Database connection (MongoDB)
 ├── 📂 models            # Mongoose schemas
 ├── 📂 pages
 │   ├── index.js         # Home page
 │   ├── api
 │   │   ├── transactions.js  # API routes for transactions
 ├── 📂 styles            # Global styles
 ├── .env.local           # Environment variables (not committed)
 ├── package.json         # Dependencies & scripts
 ├── README.md            # Project documentation

```
### **🖥️ Usage**

1️⃣ **Adding a Transaction**  
- Click on "Add Transaction".  
- Enter amount, date, description, and category.  
- Click Submit.  

2️⃣ **Viewing Expenses**  
- The Summary Dashboard shows total expenses and recent transactions.  
- The Pie Chart shows category-wise spending.  
- The Bar Chart shows monthly expense trends.  

3️⃣ **Editing & Deleting Transactions**  
- Hover over a transaction in the Recent Transactions List.  
- Click the ✏️ Edit or 🗑️ Delete button.

### **🛠️ Contributing**  
We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch (e.g., `feature-branch`).
3. Commit your changes:  
   ```bash
   git commit -m "Added feature X"
   ```
   

git push origin feature-branch


This ensures the sections are properly formatted and easy to follow! 🚀 Let me know if you need any more changes.




