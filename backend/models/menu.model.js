import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      enum: ["sunday", "monday", "tuesday", "wednesday", "thursday"],
      unique: true,
    },
    meal: {
      en: {
        type: String,
        required: true,
        trim: true,
      },
      ar: {
        type: String,
        required: true,
        trim: true,
      },
      fr: {
        type: String,
        required: true,
        trim: true,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Menu = mongoose.model("Menu", menuSchema);
export default Menu;
