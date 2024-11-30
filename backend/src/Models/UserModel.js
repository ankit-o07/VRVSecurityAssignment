import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the schema for the User model
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
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
  role: {
    type: String,
    enum: ["Admin", "Moderator", "User"],
    default: "Moderator",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the User model
const UserModel = mongoose.model('User', UserSchema);

// Export the model
export  { UserModel };

