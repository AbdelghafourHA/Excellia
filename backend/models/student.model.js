import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    childName: {
      type: String,
      required: [true, "Child name is required"],
      trim: true,
      minlength: [2, "Child name must be at least 2 characters"],
      maxlength: [100, "Child name cannot exceed 100 characters"],
    },
    parentName: {
      type: String,
      required: [true, "Parent name is required"],
      trim: true,
      minlength: [2, "Parent name must be at least 2 characters"],
      maxlength: [100, "Parent name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
      // unique: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[0-9+ ]{8,15}$/, "Invalid phone number"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    ageGroup: {
      type: String,
      required: [true, "Age group is required"],
      enum: ["3years", "4years", "5years"],
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    message: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
