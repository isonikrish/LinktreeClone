import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Create a response indicating successful signout
    const response = NextResponse.json(
      { msg: "Logout successful" },
      { status: 200 }
    );

    // Clear the 'userToken' cookie by setting it with an expiration in the past
    response.cookies.set("userToken", "", {
      maxAge: -1, // Negative value to immediately expire the cookie
    });

    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json(
      { msg: "Server Error" },
      {
        status: 500,
      }
    );
  }
}
