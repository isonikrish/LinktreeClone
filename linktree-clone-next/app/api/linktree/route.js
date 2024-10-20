// /api/linktree
import { connectDB } from "@/lib/config/db";
import LinktreeModel from "@/lib/models/LinktreeModel";
import UserModel from "@/lib/models/UserModel";
import { protectUser } from "@/lib/utils/protectRoute";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();
  const user = await protectUser(request);
  try {
    const formData = await request.formData();
    const username = formData.get("username"); //linktree name
    // Check if the Linktree username already exists
    const existingLinktree = await LinktreeModel.findOne({ username });
    if (existingLinktree) {
      return NextResponse.json(
        { msg: "Username already exists" },
        { status: 400 }
      );
    }

    const newLinktree = new LinktreeModel({
      userId: user._id,
      username,
      links: [],
    });
    await newLinktree.save();
    user.linktrees.push(newLinktree._id);
    await user.save();
    return NextResponse.json(
      { msg: "Linktree created successfully", linktree: newLinktree },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST request:", error.message);
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}
export async function DELETE(request) {
    await connectDB();
  
    // Await the protectUser function to get the user
    const user = await protectUser(request); 
  
    // Extract the id from the query string
    const url = new URL(request.url);
    const id = url.searchParams.get('id'); // Use searchParams to get the id
  
    try {
      // Find the linktree by id and userId
      const linktree = await LinktreeModel.findOne({ _id: id, userId: user._id });
      if (!linktree) {
        return NextResponse.json(
          { msg: "Linktree not found or not authorized to delete" },
          { status: 404 }
        );
      }
  
      // Delete the linktree
      await LinktreeModel.deleteOne({ _id: id });
  
      // Remove the linktree ID from the user's linktrees array
      user.linktrees.pull(linktree._id);
      await user.save();
  
      return NextResponse.json(
        { msg: "Linktree deleted successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error in Delete request:", error.message);
      return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
    }
}
