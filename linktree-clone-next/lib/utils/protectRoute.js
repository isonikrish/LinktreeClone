
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';

export async function protectUser(request) {
  const JWT_SECRET = process.env.JWT_SECRET;

  try {
    // Retrieve token from cookies
    const tokenCookie = request.cookies.get("userToken");

    // If no token, throw unauthorized error
    if (!tokenCookie || typeof tokenCookie.value !== "string") {
      throw new Error("Unauthorized: No token provided");
    }

    // Verify token
    const decoded = jwt.verify(tokenCookie.value, JWT_SECRET);

    // Fetch user from database
    const user = await UserModel.findById(decoded.id).select("-password");
    if (!user) {
      throw new Error("User not found");
    }

    // Return the authenticated user
    return user;

  } catch (error) {
    console.error("Error in protectUser:", error.message);
    throw error; // Let the route handle the response
  }
}
