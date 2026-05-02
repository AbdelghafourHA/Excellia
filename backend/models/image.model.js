import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    title: {
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
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model("Image", imageSchema);
export default Image;
