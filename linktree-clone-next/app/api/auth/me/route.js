import { connectDB } from "@/lib/config/db";
import UserModel from "@/lib/models/UserModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
  await connectDB();

  try {
    const token = request.cookies.get("userToken");

    // If no token, return an unauthorized error
    if (!token) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id).select("-password");
    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Server Error" }, { status: 500 });
  }
}
