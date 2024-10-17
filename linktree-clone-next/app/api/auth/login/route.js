import { connectDB } from "@/lib/config/db";
import UserModel from "@/lib/models/UserModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"; // Make sure to import bcrypt
import jwt from "jsonwebtoken";
export async function POST(request) {
  await connectDB();
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {
      return NextResponse.json(
        { msg: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { msg: "Invalid email or password" },
        { status: 401 }
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { msg: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "1d" } // Token expiration time set to 1 day
    );
    const response = NextResponse.json(
      { msg: "Login successful" },
      { status: 200 }
    );
    response.cookies.set("userToken", token, {
      maxAge: 86400, // Max age in seconds (1 day = 86400 seconds)
    });
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { msg: "Server Error" },
      {
        status: 500,
      }
    );
  }
}
