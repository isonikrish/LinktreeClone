import mongoose from "mongoose";

// Define the Linktree schema
const LinkSchema = new mongoose.Schema(
  {
    title: {
      // Title of the link
      type: String,
      required: true,
    },
    url: {
      // URL of the link
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+\..+/.test(v); // Basic URL validation
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    clicks: {
      type: Number,
      default: 0,
    },
    isVisible: {
      
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Create the model
const LinkModel = mongoose.models.Link || mongoose.model("Link", LinkSchema);
export default LinkModel;
