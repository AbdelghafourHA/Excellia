import { create } from "zustand";
import api from "../api/axios";
import { toast } from "react-hot-toast";

const useMenu = create((set, get) => ({
  menu: [],
  loading: false,
  error: null,

  fetchMenu: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get("/menu");
      set({ menu: response.data.menu, loading: false });
    } catch (error) {
      console.error("Fetch menu error:", error);
      set({
        error: error.response?.data?.message || "Failed to fetch menu",
        loading: false,
      });
      toast.error(error.response?.data?.message || "Failed to fetch menu");
    }
  },

  updateMenuItem: async (day, mealEn, mealAr, mealFr, isActive) => {
    try {
      set({ loading: true, error: null });
      const response = await api.put(`/menu/${day}`, {
        mealEn,
        mealAr,
        mealFr,
        isActive,
      });
      set((state) => ({
        menu: state.menu.map((item) =>
          item.day === day ? response.data.menuItem : item
        ),
        loading: false,
      }));
      toast.success("Menu updated successfully");
      return { success: true };
    } catch (error) {
      console.error("Update menu error:", error);
      const message = error.response?.data?.message || "Failed to update menu";
      set({ error: message, loading: false });
      toast.error(message);
      return { success: false, message };
    }
  },

  updateMultipleMenu: async (menuItems) => {
    try {
      set({ loading: true, error: null });
      const response = await api.put("/menu", { menuItems });
      set({ menu: response.data.menu, loading: false });
      toast.success("All menu items updated successfully");
      return { success: true };
    } catch (error) {
      console.error("Update multiple menu error:", error);
      const message = error.response?.data?.message || "Failed to update menu";
      set({ error: message, loading: false });
      toast.error(message);
      return { success: false, message };
    }
  },

  resetMenu: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.post("/menu/reset");
      set({ menu: response.data.menu, loading: false });
      toast.success("Menu reset to default");
      return { success: true };
    } catch (error) {
      console.error("Reset menu error:", error);
      const message = error.response?.data?.message || "Failed to reset menu";
      set({ error: message, loading: false });
      toast.error(message);
      return { success: false, message };
    }
  },
}));

export default useMenu;
