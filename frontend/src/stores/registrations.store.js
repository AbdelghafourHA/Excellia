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
          limit: filters.limit || 10, // ✅ FIXED
        },
        loading: false,
      });

      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch registrations";

      set({ error: message, loading: false });
      toast.error(message);

      return { success: false, message };
    }
  },

  // Fetch stats
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
      const message =
        error.response?.data?.message || "Failed to fetch statistics";

      set({ error: message, loading: false });
      toast.error(message);

      return { success: false, message };
    }
  },

  // Submit registration
  submitRegistration: async (formData) => {
    try {
      set({ loading: true, error: null });

      const response = await api.post("/registrations", formData);

      set({ loading: false });

      toast.success(
        `${formData.childName} registered successfully!` // ✅ FIXED UX
      );

      return { success: true, data: response.data.data };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to submit registration";

      set({ error: message, loading: false });
      toast.error(message);

      return { success: false, message };
    }
  },

  // Update status
  updateStatus: async (id, status) => {
    try {
      set({ loading: true, error: null });

      const response = await api.put(`/registrations/${id}/status`, {
        status,
      });

      set((state) => ({
        registrations: state.registrations.map((reg) =>
          reg._id === id ? response.data.data : reg
        ),
        loading: false,
      }));

      await get().fetchStats(); // kept as-is (no change)

      toast.success(`Registration ${status} successfully`);

      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update status";

      set({ error: message, loading: false });
      toast.error(message);

      return { success: false, message };
    }
  },

  // Delete single
  deleteRegistration: async (id) => {
    try {
      set({ loading: true, error: null });

      await api.delete(`/registrations/${id}`);

      set((state) => ({
        registrations: state.registrations.filter((reg) => reg._id !== id),
        loading: false,
      }));

      await get().fetchStats(); // kept as-is

      toast.success("Registration deleted successfully");

      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete registration";

      set({ error: message, loading: false });
      toast.error(message);

      return { success: false, message };
    }
  },

  // Bulk delete
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

      await get().fetchStats(); // kept as-is

      toast.success(response.data.message);

      return {
        success: true,
        deletedCount: response.data.deletedCount,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete registrations";

      set({ error: message, loading: false });
      toast.error(message);

      return { success: false, message };
    }
  },

  // Get by ID
  getRegistrationById: async (id) => {
    try {
      set({ loading: true, error: null });

      const response = await api.get(`/registrations/${id}`);

      set({ loading: false });

      return { success: true, data: response.data.data };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch registration";

      set({ error: message, loading: false });
      toast.error(message);

      return { success: false, message };
    }
  },

  // Clear error
  clearError: () => set({ error: null }),

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
