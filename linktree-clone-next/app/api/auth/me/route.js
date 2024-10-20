import { connectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import { protectUser } from "@/lib/utils/protectRoute.js";
import UserModel from "@/lib/models/UserModel"; // Import the UserModel
import LinktreeModel from "@/lib/models/LinktreeModel"; // Import the LinktreeModel

export async function GET(request) {
  await connectDB();

  try {
    // Get the authenticated user
    const AuthUser = await protectUser(request);

    // Fetch the user and populate the linktrees field
    const User = await UserModel.findOne({ _id: AuthUser.id }).populate("linktrees");

    return NextResponse.json({ User }, { status: 200 });
  } catch (error) {
    if (error.message.includes("Unauthorized")) {
      return NextResponse.json({ msg: error.message }, { status: 401 });
    } else if (error.message.includes("User not found")) {
      return NextResponse.json({ msg: error.message }, { status: 404 });
    } else {
      return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
  }
}
