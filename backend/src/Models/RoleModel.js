import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the schema for the Role model
const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: {
    type: [String],
    default: [], // Example: ["CREATE_POST", "DELETE_POST", "MODERATE_COMMENTS"]
  },
});

// Create the Role model
const RoleModel = mongoose.model("Role", roleSchema);

// Export the model
export { RoleModel };
