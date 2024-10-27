import LinkModel from "@/lib/models/LinkModel";
import LinktreeModel from "@/lib/models/LinktreeModel";
import { protectUser } from "@/lib/utils/protectRoute";
import { NextResponse } from "next/server";

export async function POST(request) {
  // Parse the request body
  const formData = await request.formData();
  const title = formData.get("title");
  const url = formData.get("url");
  const linktreeId = formData.get("linktreeId");

  try {
    if (!linktreeId || !title || !url) {
      return NextResponse.json({ msg: "No relevant data" }, { status: 400 });
    }

    // Check if linktree exists
    const linktreeFound = await LinktreeModel.findOne({ _id: linktreeId });
    if (!linktreeFound) {
      return NextResponse.json({ msg: "No linktree found" }, { status: 404 });
    }

    // Create new link
    const newLink = new LinkModel({
      title,
      url,
    });
    await newLink.save();

    // Add new link to the linktree
    linktreeFound.links.push(newLink._id);
    await linktreeFound.save();

    // Return success response
    return NextResponse.json({ msg: "Link created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating link:", error); // Log the error for debugging
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
export async function PUT(request) {
  try {
    const { linkId, linktreeId, isVisible } = await request.json();
    if (!linkId || !linktreeId) {
      return NextResponse.json(
        { msg: "Missing link or linktree ID" },
        { status: 400 }
      );
    }
    const linktreeFound = await LinktreeModel.findOne({ _id: linktreeId });
    if (!linktreeFound) {
      return NextResponse.json({ msg: "No linktree found" }, { status: 404 });
    }

    // Find the link in the database
    const linkToUpdate = await LinkModel.findOne({ _id: linkId });
    if (!linkToUpdate) {
      return NextResponse.json({ msg: "No link found" }, { status: 404 });
    }

    if (typeof isVisible !== "undefined") {
      linkToUpdate.isVisible = isVisible;
    }
    await linkToUpdate.save();

    // Return success response
    return NextResponse.json(
      { msg: "Link updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating link:", error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
export async function DELETE(request) {
  const user = protectUser(request);
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  try {
    const link = await LinkModel.findOne({ _id: id });
    if (!link) {
      return NextResponse.json(
        { msg: "Link not found or not authorized to delete" },
        { status: 404 }
      );
    }
    const linktree = await LinktreeModel.findOne({ links: id });
    if (!linktree) {
      return NextResponse.json(
        { msg: "Linktree not found or link not associated with this user" },
        { status: 404 }
      );
    }

    linktree.links.pull(link._id); // Remove link from the array
    await linktree.save();
    await LinkModel.deleteOne({ _id: id });

    return NextResponse.json(
      { msg: "Link deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in Delete request:", error.message);
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}
