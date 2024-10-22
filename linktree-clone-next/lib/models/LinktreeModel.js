import mongoose from "mongoose";
import LinkModel from "./LinkModel";
// Define the Linktree schema
const LinktreeSchema = new mongoose.Schema(
  {
    userId: {
      // Reference to the User model
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      // Username for the Linktree URL
      type: String,
      required: true,
      unique: true, // Ensure usernames are unique
      trim: true,
      minlength: 3, // Minimum length for the username
      maxlength: 30, // Maximum length for the username
    },
    image: {
      type: String,
    },
    links: [
      {
        // Array of links
        type: mongoose.Schema.Types.ObjectId,
        ref: "Link",
      },
    ],
  },
  { timestamps: true }
);

// Create the model
const LinktreeModel =
  mongoose.models.Linktree || mongoose.model("Linktree", LinktreeSchema);
export default LinktreeModel;
