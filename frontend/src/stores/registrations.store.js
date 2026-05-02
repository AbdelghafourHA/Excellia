import { create } from "zustand";
import api from "../api/axios";
import { toast } from "react-hot-toast";

const useRegistrations = create((set, get) => ({
  registrations: [],
  loading: false,
  error: null,
  stats: {
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    byAgeGroup: {
      "3years": 0,
      "4years": 0,
      "5years": 0,
    },
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalRegistrations: 0,
    limit: 10,
  },

  // Fetch all registrations with filters
  fetchRegistrations: async (filters = {}) => {
    try {
      set({ loading: true, error: null });

      const { status, ageGroup, page = 1, limit = 10 } = filters;
      const params = new URLSearchParams();

      if (status && status !== "all") params.append("status", status);
      if (ageGroup && ageGroup !== "all") params.append("ageGroup", ageGroup);
      if (page) params.append("page", page);
      if (limit) params.append("limit", limit);

      const queryString = params.toString();
      const url = queryString
        ? `/registrations?${queryString}`
        : "/registrations";

      const response = await api.get(url);

      set({
        registrations: response.data.data,
        pagination: {
          currentPage: response.data.page,
          totalPages: response.data.totalPages,
          totalRegistrations: response.data.total,
          limit: response.data.limit || 10,
        },
        loading: false,
      });

      return { success: true };
    } catch (error) {
      console.error("Fetch registrations error:", error);
      const message =
        error.response?.data?.message || "Failed to fetch registrations";
      set({ error: message, loading: false });
      toast.error(message);
      return { success: false, message };
    }
  },

  // Fetch registration statistics
  fetchStats: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get("/registrations/stats/summary");

      set({
        stats: response.data.data,
        loading: false,
      });

      return { success: true };
    } catch (error) {
      console.error("Fetch stats error:", error);
      const message =
        error.response?.data?.message || "Failed to fetch statistics";
      set({ error: message, loading: false });
      toast.error(message);
      return { success: false, message };
    }
  },

  // Submit new registration
  submitRegistration: async (formData) => {
    try {
      set({ loading: true, error: null });
      const response = await api.post("/registrations", formData);

      set({ loading: false });
      toast.success("Registration submitted successfully!");
      return { success: true, data: response.data.data };
    } catch (error) {
      console.error("Submit registration error:", error);
      const message =
        error.response?.data?.message || "Failed to submit registration";
      set({ error: message, loading: false });
      toast.error(message);
      return { success: false, message };
    }
  },

  // Update registration status
  updateStatus: async (id, status) => {
    try {
      set({ loading: true, error: null });
      const response = await api.put(`/registrations/${id}/status`, { status });

      // Update the registration in the list
      set((state) => ({
        registrations: state.registrations.map((reg) =>
          reg._id === id ? response.data.data : reg
        ),
        loading: false,
      }));

      // Refresh stats after status change
      await get().fetchStats();

      toast.success(`Registration ${status} successfully`);
      return { success: true };
    } catch (error) {
      console.error("Update status error:", error);
      const message =
        error.response?.data?.message || "Failed to update status";
      set({ error: message, loading: false });
      toast.error(message);
      return { success: false, message };
    }
  },

  // Delete a single registration
  deleteRegistration: async (id) => {
    try {
      set({ loading: true, error: null });
      await api.delete(`/registrations/${id}`);

      set((state) => ({
        registrations: state.registrations.filter((reg) => reg._id !== id),
        loading: false,
      }));

      // Refresh stats after deletion
      await get().fetchStats();

      toast.success("Registration deleted successfully");
      return { success: true };
    } catch (error) {
      console.error("Delete registration error:", error);
      const message =
        error.response?.data?.message || "Failed to delete registration";
      set({ error: message, loading: false });
      toast.error(message);
      return { success: false, message };
    }
  },

  // Delete multiple registrations
  deleteMultipleRegistrations: async (ids) => {
    try {
      set({ loading: true, error: null });
      const response = await api.post("/registrations/bulk/delete", { ids });

      set((state) => ({
        registrations: state.registrations.filter(
          (reg) => !ids.includes(reg._id)
        ),
        loading: false,
      }));

      // Refresh stats after deletion
      await get().fetchStats();

      toast.success(response.data.message);
      return { success: true, deletedCount: response.data.deletedCount };
    } catch (error) {
      console.error("Delete multiple registrations error:", error);
      const message =
        error.response?.data?.message || "Failed to delete registrations";
      set({ error: message, loading: false });
      toast.error(message);
      return { success: false, message };
    }
  },

  // Get a single registration by ID
  getRegistrationById: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await api.get(`/registrations/${id}`);

      set({ loading: false });
      return { success: true, data: response.data.data };
    } catch (error) {
      console.error("Get registration error:", error);
      const message =
        error.response?.data?.message || "Failed to fetch registration";
      set({ error: message, loading: false });
      toast.error(message);
      return { success: false, message };
    }
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Reset store
  reset: () => {
    set({
      registrations: [],
      loading: false,
      error: null,
      stats: {
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        byAgeGroup: {
          "3years": 0,
          "4years": 0,
          "5years": 0,
        },
      },
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalRegistrations: 0,
        limit: 10,
      },
    });
  },
}));

export default useRegistrations;
