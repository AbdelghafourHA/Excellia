import React, { useState, useEffect } from "react";
import { Plus, X, Upload, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import useImages from "../stores/images.store";

const ImagesTab = () => {
  const { images, loading, fetchImages, addImage, editImage, removeImage } =
    useImages();
  const [showModal, setShowModal] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [titleFr, setTitleFr] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const handleOpenModal = (image = null) => {
    if (image) {
      setEditingImage(image);
      setTitleEn(image.title?.en || "");
      setTitleAr(image.title?.ar || "");
      setTitleFr(image.title?.fr || "");
      setImagePreview(image.url);
    } else {
      setEditingImage(null);
      setTitleEn("");
      setTitleAr("");
      setTitleFr("");
      setImageFile(null);
      setImagePreview("");
    }
    setShowModal(true);
  };

  const handleSaveImage = async () => {
    if (!titleEn.trim() || !titleAr.trim() || !titleFr.trim()) {
      toast.error(
        "Please enter titles in all three languages (English, Arabic, French)"
      );
      return;
    }

    if (!editingImage && !imageFile) {
      toast.error("Please select an image");
      return;
    }

    setUploading(true);

    try {
      if (editingImage) {
        // Edit existing image
        const formData = new FormData();
        formData.append("titleEn", titleEn);
        formData.append("titleAr", titleAr);
        formData.append("titleFr", titleFr);
        if (imageFile) {
          formData.append("image", imageFile);
        }
        await editImage(editingImage._id, formData);
      } else {
        // Add new image
        const formData = new FormData();
        formData.append("titleEn", titleEn);
        formData.append("titleAr", titleAr);
        formData.append("titleFr", titleFr);
        formData.append("image", imageFile);
        await addImage(formData);
      }

      setShowModal(false);
      setTitleEn("");
      setTitleAr("");
      setTitleFr("");
      setImageFile(null);
      setImagePreview("");
      setEditingImage(null);
    } catch (error) {
      console.error("Error saving image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      await removeImage(id);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper to get display title based on available language
  const getDisplayTitle = (image) => {
    if (image.title?.en) return image.title.en;
    if (image.title?.ar) return image.title.ar;
    if (image.title?.fr) return image.title.fr;
    return "Untitled";
  };

  if (loading && images.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-12 h-12 border-4 border-green-one border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-text">Gallery Images</h2>
          <p className="text-text/60 text-sm">
            Manage images shown on the website
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-green-one text-white rounded-lg hover:bg-green-two transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Image
        </button>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image._id}
            className="group relative bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          >
            <img
              src={image.url}
              alt={getDisplayTitle(image)}
              className="w-full aspect-square object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={() => handleOpenModal(image)}
                className="p-2 bg-white rounded-lg text-text hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleDeleteImage(image._id)}
                className="p-2 bg-white rounded-lg text-orange hover:bg-gray-100 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2">
              <p className="text-text text-sm font-medium truncate">
                {getDisplayTitle(image)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && !loading && (
        <div className="text-center py-12 text-text/40">
          No images yet. Click "Add Image" to upload.
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-text">
                {editingImage ? "Edit Image" : "Add New Image"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-text/60 hover:text-text"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-6 text-center mb-4 transition-colors ${
                dragOver ? "border-green-one bg-green-one/5" : "border-gray-200"
              }`}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg mx-auto mb-2"
                />
              ) : (
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              )}
              <p className="text-text/60 text-sm">
                Drag & drop an image here or click to select
              </p>
              <p className="text-text/40 text-xs mt-1">
                Max size: 5MB (JPG, PNG, GIF, WebP)
              </p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="imageUpload"
                onChange={handleFileSelect}
              />
              <button
                onClick={() => document.getElementById("imageUpload").click()}
                className="mt-2 text-green-one text-sm"
              >
                Browse files
              </button>
            </div>

            {/* English Title */}
            <input
              type="text"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              placeholder="Title (English)"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-one mb-3"
            />

            {/* Arabic Title */}
            <input
              type="text"
              value={titleAr}
              onChange={(e) => setTitleAr(e.target.value)}
              placeholder="Title (العربية)"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-one mb-3 font-cairo text-right"
            />

            {/* French Title */}
            <input
              type="text"
              value={titleFr}
              onChange={(e) => setTitleFr(e.target.value)}
              placeholder="Title (Français)"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-one mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-text hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveImage}
                disabled={uploading}
                className="flex-1 px-4 py-2 bg-green-one text-white rounded-lg hover:bg-green-two transition-colors disabled:opacity-50"
              >
                {uploading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesTab;
