import React, { useState, useEffect } from "react";
import {
  Plus,
  X,
  Upload,
  Trash2,
  Edit2,
  Image as ImageIcon,
} from "lucide-react";
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
        const formData = new FormData();
        formData.append("titleEn", titleEn);
        formData.append("titleAr", titleAr);
        formData.append("titleFr", titleFr);
        if (imageFile) {
          formData.append("image", imageFile);
        }
        await editImage(editingImage._id, formData);
        toast.success("Image updated successfully");
      } else {
        const formData = new FormData();
        formData.append("titleEn", titleEn);
        formData.append("titleAr", titleAr);
        formData.append("titleFr", titleFr);
        formData.append("image", imageFile);
        await addImage(formData);
        toast.success("Image added successfully");
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
      toast.error("Failed to save image");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      await removeImage(id);
      toast.success("Image deleted successfully");
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
      {/* Stats Bar */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6 flex justify-between items-center flex-wrap gap-3">
        <div>
          <p className="text-sm text-text/60">Total Images</p>
          <p className="text-2xl font-bold text-text">{images.length}</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-one to-green-two text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          Add New Image
        </button>
      </div>

      {/* Images Grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {images.map((image) => (
            <div
              key={image._id}
              className="group relative bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={image.url}
                  alt={getDisplayTitle(image)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                  <button
                    onClick={() => handleOpenModal(image)}
                    className="p-2.5 bg-white rounded-xl text-green-one hover:bg-gray-100 transition-all duration-200 hover:scale-110"
                    title="Edit Image"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteImage(image._id)}
                    className="p-2.5 bg-white rounded-xl text-red-500 hover:bg-gray-100 transition-all duration-200 hover:scale-110"
                    title="Delete Image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Image Info */}
              <div className="p-3">
                <p className="text-text text-sm font-medium truncate">
                  {getDisplayTitle(image)}
                </p>
                <p className="text-text/40 text-xs mt-1">
                  {new Date(image.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-text/60 text-base">No images yet</p>
          <p className="text-text/40 text-sm mt-1">
            Click "Add New Image" to upload your first image
          </p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-5 flex justify-between items-center">
              <h3 className="text-xl font-bold text-text">
                {editingImage ? "Edit Image" : "Add New Image"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-text/60" />
              </button>
            </div>

            <div className="p-5">
              {/* Image Upload Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-6 text-center mb-5 transition-all duration-200 cursor-pointer ${
                  dragOver
                    ? "border-green-one bg-green-one/5 scale-105"
                    : "border-gray-200 hover:border-green-one/50"
                }`}
              >
                {imagePreview ? (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-36 h-36 object-cover rounded-xl mx-auto shadow-md"
                    />
                    <button
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview("");
                      }}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-text/70 text-sm mb-1">
                      Drag & drop an image here
                    </p>
                    <p className="text-text/40 text-xs mb-3">or</p>
                    <label className="inline-block px-4 py-2 bg-green-one/10 text-green-one rounded-lg text-sm font-medium cursor-pointer hover:bg-green-one/20 transition-colors">
                      Browse Files
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileSelect}
                      />
                    </label>
                    <p className="text-text/40 text-xs mt-3">
                      Max size: 5MB (JPG, PNG, GIF, WebP)
                    </p>
                  </>
                )}
              </div>

              {/* Title Inputs */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    English Title *
                  </label>
                  <input
                    type="text"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder="Enter English title"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-green-one focus:ring-2 focus:ring-green-one/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    Arabic Title *
                  </label>
                  <input
                    type="text"
                    value={titleAr}
                    onChange={(e) => setTitleAr(e.target.value)}
                    placeholder="أدخل العنوان بالعربية"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-green-one focus:ring-2 focus:ring-green-one/20 transition-all font-cairo text-right"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    French Title *
                  </label>
                  <input
                    type="text"
                    value={titleFr}
                    onChange={(e) => setTitleFr(e.target.value)}
                    placeholder="Entrez le titre en français"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-green-one focus:ring-2 focus:ring-green-one/20 transition-all"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-text/70 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveImage}
                  disabled={uploading}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-one to-green-two text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    "Save Image"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesTab;
