import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function GET() {
  await connectDB();
  const transactions = await Transaction.find();
  return new Response(JSON.stringify(transactions), { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const { amount, date, description, category } = await req.json(); // ✅ Include category

  if (!amount || !date || !description || !category) {
    return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
  }

  const transaction = new Transaction({ amount, date, description, category }); // ✅ Save category
  await transaction.save();
  return new Response(JSON.stringify(transaction), { status: 201 });
}

export async function PUT(req) {
  await connectDB();
  const { _id, amount, date, description, category } = await req.json(); // ✅ Include category

  if (!amount || !date || !description || !category) {
    return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
  }

  const updatedTransaction = await Transaction.findByIdAndUpdate(
    _id,
    { amount, date, description, category }, // ✅ Update category
    { new: true }
  );

  if (updatedTransaction) {
    return new Response(JSON.stringify(updatedTransaction), { status: 200 });
  } else {
    return new Response(JSON.stringify({ message: "Transaction not found" }), { status: 404 });
  }
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  const deletedTransaction = await Transaction.findByIdAndDelete(id);
  
  if (deletedTransaction) {
    return new Response(JSON.stringify({ message: "Deleted" }), { status: 200 });
  }
  return new Response(JSON.stringify({ message: "Transaction not found" }), { status: 404 });
}
