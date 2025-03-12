import { connectDB } from "@/lib/mongodb";
import Budget from "@/models/Budget";

export async function GET() {
  await connectDB();
  const budgets = await Budget.find();
  return new Response(JSON.stringify(budgets), { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const { category, amount } = await req.json();

  const existingBudget = await Budget.findOne({ category });
  if (existingBudget) {
    return new Response(
      JSON.stringify({ message: "Budget already set for this category" }),
      { status: 400 }
    );
  }

  const budget = new Budget({ category, amount });
  await budget.save();
  return new Response(JSON.stringify(budget), { status: 201 });
}

export async function PUT(req) {
  await connectDB();
  const { category, amount } = await req.json();

  const updatedBudget = await Budget.findOneAndUpdate(
    { category },
    { amount },
    { new: true }
  );

  if (!updatedBudget) {
    return new Response(JSON.stringify({ message: "Budget not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(updatedBudget), { status: 200 });
}
