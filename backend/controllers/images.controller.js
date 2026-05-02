import Image from "../models/image.model.js";
import cloudinary from "../lib/cloudinary.js";

// Fetch all images
export const fetchAllImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      images,
    });
  } catch (error) {
    console.error("Fetch images error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch images",
      error: error.message,
    });
  }
};

// Add a new image
export const addImage = async (req, res) => {
  try {
    console.log("=== ADD IMAGE DEBUG ===");
    console.log("Request body:", req.body);
    console.log("Request file:", req.file ? "File received" : "No file");
    console.log("File mimetype:", req.file?.mimetype);
    console.log("File size:", req.file?.size);

    const { titleEn, titleAr, titleFr } = req.body;
    const file = req.file;

    if (!titleEn || !titleAr || !titleFr) {
      return res.status(400).json({
        success: false,
        message: "All title fields (English, Arabic, French) are required",
      });
    }

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    // Convert buffer to base64 for Cloudinary
    const base64Image = `data:${file.mimetype};base64,${file.buffer.toString(
      "base64"
    )}`;

    console.log("Uploading to Cloudinary...");

    // Upload to Cloudinary using base64
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "excellia/gallery",
      transformation: [{ width: 600, height: 600, crop: "fill" }],
    });

    console.log("Cloudinary upload success:", result.secure_url);

    const newImage = new Image({
      title: {
        en: titleEn,
        ar: titleAr,
        fr: titleFr,
      },
      url: result.secure_url,
    });

    await newImage.save();
    console.log("Image saved to database:", newImage._id);

    res.status(201).json({
      success: true,
      message: "Image added successfully",
      image: newImage,
    });
  } catch (error) {
    console.error("Add image error DETAILS:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to add image",
      error: error.message,
    });
  }
};

// Edit an image
export const editImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { titleEn, titleAr, titleFr } = req.body;
    const file = req.file;

    console.log("Edit image:", {
      id,
      titleEn,
      titleAr,
      titleFr,
      hasFile: !!file,
    });

    const existingImage = await Image.findById(id);
    if (!existingImage) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    // Update titles if provided
    if (titleEn) existingImage.title.en = titleEn;
    if (titleAr) existingImage.title.ar = titleAr;
    if (titleFr) existingImage.title.fr = titleFr;

    if (file) {
      // Delete old image from Cloudinary
      try {
        const urlParts = existingImage.url.split("/");
        const filename = urlParts[urlParts.length - 1];
        const publicId = `excellia/gallery/${filename.split(".")[0]}`;
        console.log("Deleting old image from Cloudinary:", publicId);
        await cloudinary.uploader.destroy(publicId);
      } catch (cloudinaryError) {
        console.error("Cloudinary delete error:", cloudinaryError);
      }

      // Upload new image
      const base64Image = `data:${file.mimetype};base64,${file.buffer.toString(
        "base64"
      )}`;
      const result = await cloudinary.uploader.upload(base64Image, {
        folder: "excellia/gallery",
        transformation: [{ width: 600, height: 600, crop: "fill" }],
      });
      existingImage.url = result.secure_url;
    }

    await existingImage.save();

    res.status(200).json({
      success: true,
      message: "Image updated successfully",
      image: existingImage,
    });
  } catch (error) {
    console.error("Edit image error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update image",
      error: error.message,
    });
  }
};

// Remove an image
export const removeImage = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    // Delete from Cloudinary
    try {
      const urlParts = image.url.split("/");
      const filename = urlParts[urlParts.length - 1];
      const publicId = `excellia/gallery/${filename.split(".")[0]}`;
      console.log("Deleting from Cloudinary:", publicId);
      await cloudinary.uploader.destroy(publicId);
    } catch (cloudinaryError) {
      console.error("Cloudinary delete error:", cloudinaryError);
    }

    // Delete from database
    await Image.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Delete image error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete image",
      error: error.message,
    });
  }
};
