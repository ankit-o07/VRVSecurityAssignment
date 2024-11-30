import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the schema for the AuditLog model
const auditLogSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  action: {
    type: String,
    required: true, // Example: "Created Post", "Deleted Comment"
  },
  details: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the AuditLog model
const AuditLogModel = mongoose.model("AuditLog", auditLogSchema);

// Export the model
export { AuditLogModel };
