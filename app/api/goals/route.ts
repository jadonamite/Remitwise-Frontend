import { getAllGoals } from "@/lib/contracts/savings-goal";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const publicKey = req.headers.get("x-public-key");

    if (!publicKey) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const goals = await getAllGoals(publicKey);

    return NextResponse.json(goals, { status: 200 });

  } catch (error) {
    console.error("GET /api/goals error:", error);

    return NextResponse.json(
      { error: "Failed to fetch goals" },
      { status: 500 }
    );
  }
}