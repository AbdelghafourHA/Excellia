import { create } from "zustand";
import api from "../api/axios";
import { toast } from "react-hot-toast";

const useImages = create((set, get) => ({
  images: [],
  loading: false,
  error: null,

  fetchImages: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get("/images");
      set({ images: response.data.images, loading: false });
    } catch (error) {
      console.error("Fetch images error:", error);
      set({
        error: error.response?.data?.message || "Failed to fetch images",
        loading: false,
      });
      toast.error(error.response?.data?.message || "Failed to fetch images");
    }
  },

  addImage: async (formData) => {
    try {
      set({ loading: true, error: null });
      const response = await api.post("/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set((state) => ({
        images: [response.data.image, ...state.images],
        loading: false,
      }));
      toast.success("Image added successfully");
      return { success: true };
    } catch (error) {
      console.error("Add image error:", error);
      const message = error.response?.data?.message || "Failed to add image";
      set({ error: message, loading: false });
      toast.error(message);
      return { success: false, message };
    }
  },

  editImage: async (id, formData) => {
    try {
      set({ loading: true, error: null });
      const response = await api.put(`/images/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set((state) => ({
        images: state.images.map((img) =>
          img._id === id ? response.data.image : img
        ),
        loading: false,
      }));
      toast.success("Image updated successfully");
      return { success: true };
    } catch (error) {
      console.error("Edit image error:", error);
      const message = error.response?.data?.message || "Failed to update image";
      set({ error: message, loading: false });
      toast.error(message);
      return { success: false, message };
    }
  },

  removeImage: async (id) => {
    try {
      set({ loading: true, error: null });
      await api.delete(`/images/${id}`);
      set((state) => ({
        images: state.images.filter((img) => img._id !== id),
        loading: false,
      }));
      toast.success("Image deleted successfully");
      return { success: true };
    } catch (error) {
      console.error("Delete image error:", error);
      const message = error.response?.data?.message || "Failed to delete image";
      set({ error: message, loading: false });
      toast.error(message);
      return { success: false, message };
    }
  },
}));

export default useImages;
