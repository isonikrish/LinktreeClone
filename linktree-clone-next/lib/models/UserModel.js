import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    profileImage: {
        type: String, // URL of the profile image
    },
    linktrees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Linktree" }],

},{timestamps:true})


const UserModel = mongoose.models.User || mongoose.model("User",UserSchema);
export default UserModel;