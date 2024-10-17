import UserModel from "@/lib/models/UserModel";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(request) {
  await connectDB();
  try {
    const formData = await request.formData();
    //extract the fields
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!username || !email || !password) {
      return NextResponse.json(
        { msg: "Missing required fields" },
        { status: 400 }
      );
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return NextResponse.json({ msg: "User already exists" }, { status: 409 });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username, email: newUser.email }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "1d" } // Token expiration time
    );

    const response = NextResponse.json(
      { msg: "User created successfully" },
      {
        status: 201,
      }
    );
    response.cookies.set("userToken", token, { maxAge: 86400 });
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
