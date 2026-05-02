import React, { useState, useEffect } from "react";
import {
  Eye,
  Check,
  X,
  Download,
  Filter,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Clock,
} from "lucide-react";
import { toast } from "react-hot-toast";
import useRegistrations from "../stores/registrations.store";

const OrdersTab = () => {
  const {
    registrations,
    loading,
    stats,
    pagination,
    fetchRegistrations,
    fetchStats,
    updateStatus,
    deleteRegistration,
    deleteMultipleRegistrations,
  } = useRegistrations();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const ageLevels = {
    "3years": { label: "3 Years Old", color: "blue" },
    "4years": { label: "4 Years Old", color: "green" },
    "5years": { label: "5 Years Old", color: "orange" },
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  useEffect(() => {
    loadData();
  }, [filterLevel, filterStatus, currentPage]);

  const loadData = async () => {
    await fetchRegistrations({
      status: filterStatus,
      ageGroup: filterLevel,
      page: currentPage,
      limit: 10,
    });
    await fetchStats();
  };

  const handleUpdateStatus = async (id, status) => {
    const result = await updateStatus(id, status);
    if (result.success) {
      await loadData();
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this registration?")) {
      const result = await deleteRegistration(id);
      if (result.success) {
        await loadData();
        if (selectedOrder?._id === id) {
          setSelectedOrder(null);
        }
      }
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedOrders.length === 0) return;
    if (window.confirm(`Delete ${selectedOrders.length} registration(s)?`)) {
      const result = await deleteMultipleRegistrations(selectedOrders);
      if (result.success) {
        setSelectedOrders([]);
        setSelectAll(false);
        await loadData();
      }
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(registrations.map((order) => order._id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectOrder = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
      setSelectAll(false);
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
      if (selectedOrders.length + 1 === registrations.length) {
        setSelectAll(true);
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading && registrations.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-12 h-12 border-4 border-green-one border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text/60 text-sm">Total Registrations</p>
              <p className="text-2xl font-bold text-text">{stats.total || 0}</p>
            </div>
            <div className="w-10 h-10 bg-green-one/10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-green-one" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text/60 text-sm">Pending Review</p>
              <p className="text-2xl font-bold text-yellow-600">
                {stats.pending || 0}
              </p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text/60 text-sm">Approved</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.approved || 0}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text/60 text-sm">Age Groups</p>
              <p className="text-sm font-semibold text-text">
                3y: {stats.byAgeGroup?.["3years"] || 0} | 4y:{" "}
                {stats.byAgeGroup?.["4years"] || 0} | 5y:{" "}
                {stats.byAgeGroup?.["5years"] || 0}
              </p>
            </div>
            <div className="w-10 h-10 bg-orange/10 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-3">
          <select
            value={filterLevel}
            onChange={(e) => {
              setFilterLevel(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-one text-sm"
          >
            <option value="all">All Age Groups</option>
            <option value="3years">3 Years Old</option>
            <option value="4years">4 Years Old</option>
            <option value="5years">5 Years Old</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-one text-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          {selectedOrders.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete ({selectedOrders.length})
            </button>
          )}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 text-text/60 text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={selectAll && registrations.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-green-one focus:ring-green-one"
                  />
                </th>
                <th className="text-left p-4 text-text/60 text-sm font-semibold">
                  Child Name
                </th>
                <th className="text-left p-4 text-text/60 text-sm font-semibold">
                  Parent
                </th>
                <th className="text-left p-4 text-text/60 text-sm font-semibold">
                  Age Group
                </th>
                <th className="text-left p-4 text-text/60 text-sm font-semibold">
                  Phone
                </th>
                <th className="text-left p-4 text-text/60 text-sm font-semibold">
                  Status
                </th>
                <th className="text-left p-4 text-text/60 text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order._id)}
                      onChange={() => handleSelectOrder(order._id)}
                      className="rounded border-gray-300 text-green-one focus:ring-green-one"
                    />
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-text">{order.childName}</p>
                      <p className="text-text/40 text-xs">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="text-text">{order.parentName}</p>
                      <p className="text-text/40 text-xs">{order.email}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium bg-${
                        ageLevels[order.ageGroup]?.color || "gray"
                      }-100 text-${
                        ageLevels[order.ageGroup]?.color || "gray"
                      }-700`}
                    >
                      {ageLevels[order.ageGroup]?.label || order.ageGroup}
                    </span>
                  </td>
                  <td className="p-4 text-text">{order.phone}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusColors[order.status]
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-text/60 hover:text-green-one transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {order.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleUpdateStatus(order._id, "approved")
                            }
                            className="p-2 text-text/60 hover:text-green-600 transition-colors"
                            title="Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateStatus(order._id, "rejected")
                            }
                            className="p-2 text-text/60 hover:text-red-600 transition-colors"
                            title="Reject"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDeleteOrder(order._id)}
                        className="p-2 text-text/60 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {registrations.length === 0 && !loading && (
          <div className="text-center py-12 text-text/40">
            No registrations found
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-200 rounded-lg text-text hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-text/60 text-sm">
            Page {currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pagination.totalPages}
            className="px-3 py-1 border border-gray-200 rounded-lg text-text hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center">
              <h3 className="text-xl font-bold text-text">
                Registration Details
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-text/60 hover:text-text"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-text/60 text-sm block mb-1">
                    Child's Full Name
                  </label>
                  <p className="text-text font-medium">
                    {selectedOrder.childName}
                  </p>
                </div>
                <div>
                  <label className="text-text/60 text-sm block mb-1">
                    Parent/Guardian
                  </label>
                  <p className="text-text font-medium">
                    {selectedOrder.parentName}
                  </p>
                </div>
                <div>
                  <label className="text-text/60 text-sm block mb-1">
                    Email Address
                  </label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-text/40" />
                    <p className="text-text">{selectedOrder.email}</p>
                  </div>
                </div>
                <div>
                  <label className="text-text/60 text-sm block mb-1">
                    Phone Number
                  </label>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-text/40" />
                    <p className="text-text">{selectedOrder.phone}</p>
                  </div>
                </div>
                <div>
                  <label className="text-text/60 text-sm block mb-1">
                    Date of Birth
                  </label>
                  <p className="text-text">
                    {new Date(selectedOrder.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-text/60 text-sm block mb-1">
                    Age Group
                  </label>
                  <p className="text-text">
                    {ageLevels[selectedOrder.ageGroup]?.label ||
                      selectedOrder.ageGroup}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-text/60 text-sm block mb-1">
                    Address
                  </label>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-text/40 mt-0.5" />
                    <p className="text-text">
                      {selectedOrder.address || "Not provided"}
                    </p>
                  </div>
                </div>
                {selectedOrder.message && (
                  <div className="md:col-span-2">
                    <label className="text-text/60 text-sm block mb-1">
                      Additional Message
                    </label>
                    <p className="text-text italic">{selectedOrder.message}</p>
                  </div>
                )}
                <div className="md:col-span-2">
                  <label className="text-text/60 text-sm block mb-1">
                    Submitted On
                  </label>
                  <p className="text-text">
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 flex gap-3">
              {selectedOrder.status === "pending" && (
                <>
                  <button
                    onClick={() => {
                      handleUpdateStatus(selectedOrder._id, "approved");
                      setSelectedOrder(null);
                    }}
                    className="flex-1 px-4 py-2 bg-green-one text-white rounded-lg hover:bg-green-two transition-colors"
                  >
                    Approve Registration
                  </button>
                  <button
                    onClick={() => {
                      handleUpdateStatus(selectedOrder._id, "rejected");
                      setSelectedOrder(null);
                    }}
                    className="flex-1 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Reject Registration
                  </button>
                </>
              )}
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-text hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTab;
