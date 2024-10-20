import mongoose from 'mongoose';

// Define the Linktree schema
const LinktreeSchema = new mongoose.Schema({
    userId: { // Reference to the User model
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    username: { // Username for the Linktree URL
        type: String,
        required: true,
        unique: true, // Ensure usernames are unique
        trim: true,
        minlength: 3, // Minimum length for the username
        maxlength: 30, // Maximum length for the username
    },
    links: [{ // Array of links
        title: { // Title of the link
            type: String,
            required: true,
        },
        url: { // URL of the link
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return /^https?:\/\/.+\..+/.test(v); // Basic URL validation
                },
                message: props => `${props.value} is not a valid URL!`
            },
        },
        order: { // Order of the link
            type: Number,
            default: 0, // Default order is 0
        },
    }],
}, { timestamps: true }); 

// Create the model
const LinktreeModel = mongoose.models.Linktree || mongoose.model("Linktree", LinktreeSchema);
export default LinktreeModel;
