"use client";

import { useState, useEffect, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/config";
import useBookingState from "@/store/useRoomState";
import useToastStore from "@/store/useToastStore";
import useUserStore from "@/store/useUserStore";
import { AxiosError } from "axios";

interface Vendor {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  documentId: string;
}

interface CreateVendorForm {
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface VendorSearchProps {
  onSelectVendor?: (vendor: Vendor) => void;
}

const VendorSearch = ({ onSelectVendor }: VendorSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateVendorForm>({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const { setVendor } = useBookingState();
  const { addToast } = useToastStore();
  const { user } = useUserStore();

  // Thêm ref để quản lý dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [editFormData, setEditFormData] = useState<CreateVendorForm>({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  // Fetch all vendors when component mounts, but only if user is logged in
  useEffect(() => {
    const fetchVendors = async () => {
      // Check if user is logged in
      if (!user || !user.id) {
        console.log("User not logged in, skipping vendor fetch");
        return;
      }

      setLoading(true);
      try {
        const response = await apiClient.get(`${API_ENDPOINTS.VENDORS}`);
        setVendors(response.data.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
        setError("Failed to fetch vendors");
        addToast("Không thể tải danh sách vendor", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [user]); // Add user as a dependency to re-fetch when user changes

  // Filter vendors based on search term
  useEffect(() => {
    if (searchTerm) {
      setIsDropdownVisible(true);
      const filtered = vendors.filter((vendor) =>
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVendors(filtered);
    } else {
      setIsDropdownVisible(false);
    }
  }, [searchTerm, vendors]);

  // Xử lý click bên ngoài dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Tách riêng hàm mở modal
  const openCreateModal = (e: React.MouseEvent) => {
    e.preventDefault(); // Ngăn form submit
    e.stopPropagation(); // Ngăn click event lan ra ngoài
    setIsCreateModalOpen(true);
    setIsDropdownVisible(false); // Đóng dropdown khi mở modal
  };

  const handleCreateVendor = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user is logged in
    if (!user || !user.id) {
      addToast("Please login to create a new vendor", "warning");
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post(API_ENDPOINTS.VENDORS, {
        data: formData,
      });

      // Add new vendor to the list
      setVendors([...vendors, response.data.data]);

      // Reset form and close modal
      setFormData({ name: "", address: "", phone: "", email: "" });
      setIsCreateModalOpen(false);

      addToast("Vendor created successfully", "success");
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(
          error.response?.data.error.status === 400
            ? "Name or Phone And Email must be unique"
            : "Failed to create vendor"
        );
      } else {
        setError("Failed to create vendor");
      }
      addToast("Failed to create vendor", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectVendor = (e: React.MouseEvent, vendor: Vendor) => {
    e.preventDefault();
    e.stopPropagation();

    setSelectedVendor(vendor);
    setSearchTerm(vendor.name);
    setIsDropdownVisible(false);

    setVendor(vendor);
    if (onSelectVendor) {
      onSelectVendor(vendor);
    }

    addToast(`Selected vendor: ${vendor.name}`, "info");
  };

  const handleEditVendor = (e: React.MouseEvent, vendor: Vendor) => {
    e.preventDefault();
    e.stopPropagation();

    setEditingVendor(vendor);
    setEditFormData({
      name: vendor.name,
      address: vendor.address,
      phone: vendor.phone,
      email: vendor.email,
    });
    setIsEditModalOpen(true);
    setIsDropdownVisible(false);
  };

  const handleUpdateVendor = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user is logged in
    if (!user || !user.id) {
      addToast("Please login to update vendor", "warning");
      return;
    }

    if (!editingVendor) return;

    setLoading(true);
    try {
      const response = await apiClient.put(
        `${API_ENDPOINTS.VENDORS}/${editingVendor.documentId}`,
        {
          data: editFormData,
        }
      );

      // Cập nhật vendor trong danh sách
      const updatedVendors = vendors.map((vendor) =>
        vendor.id === editingVendor.id ? response.data.data : vendor
      );
      setVendors(updatedVendors);

      // Cập nhật vendor đã chọn nếu đang được chọn
      if (selectedVendor && selectedVendor.id === editingVendor.id) {
        setSelectedVendor(response.data.data);
        setSearchTerm(response.data.data.name);
        setVendor(response.data.data);
        if (onSelectVendor) {
          onSelectVendor(response.data.data);
        }
      }

      // Đóng modal
      setIsEditModalOpen(false);
      setEditingVendor(null);

      addToast("Vendor updated successfully", "success");
    } catch (error) {
      console.error("Error updating vendor:", error);
      setError("Failed to update vendor");
      addToast("Cannot update vendor. Please try again!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white pb-0 px-4 pt-4 w-full">
      <div className="relative" ref={dropdownRef}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            // Reset selectedVendor if input is cleared or changed
            if (selectedVendor && e.target.value !== selectedVendor.name) {
              setSelectedVendor(null);
            }
          }}
          onFocus={() => searchTerm && setIsDropdownVisible(true)}
          placeholder="Enter vendor name..."
          className="w-full p-2 border rounded-md focus:ring-accent focus:border-accent"
        />

        {/* Selected Vendor Info */}
        {selectedVendor && (
          <div className="mt-2 p-2 bg-gray-50 border rounded-md">
            <div className="font-medium text-accent">{selectedVendor.name}</div>
            <div className="text-sm">
              <div>{selectedVendor.address}</div>
              <div>Phone: {selectedVendor.phone}</div>
              <div>Email: {selectedVendor.email}</div>
            </div>
          </div>
        )}

        {/* Vendor List */}
        {isDropdownVisible && (
          <div className="absolute z-10 w-[400px] mb-0 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredVendors.length > 0 ? (
              filteredVendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                >
                  <div
                    onClick={() => {
                      setSearchTerm(vendor.name);
                      setIsDropdownVisible(false);
                    }}
                    className="flex-1"
                  >
                    <div className="font-medium">{vendor.name}</div>
                    <div className="text-sm text-gray-600">{vendor.email}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleEditVendor(e, vendor)}
                      className="bg-gray-200 text-gray-800 py-1 px-3 rounded-md hover:bg-gray-300"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleSelectVendor(e, vendor)}
                      className="bg-accent text-white py-1 px-3 rounded-md hover:bg-accent/90"
                    >
                      Select
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4">
                <p className="text-gray-600 mb-2">No vendor found</p>
                <button
                  onClick={openCreateModal}
                  className="w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-accent/90"
                >
                  Create New Vendor
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create Vendor Modal */}
      {isCreateModalOpen && (
        <Dialog
          open={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 mb-4"
              >
                Create New Vendor
              </Dialog.Title>

              <form onSubmit={handleCreateVendor}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-accent focus:outline-none focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-accent focus:outline-none focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-accent focus:outline-none focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-accent focus:outline-none focus:ring-accent"
                    />
                  </div>
                </div>

                {error && <p className="text-red-500 mt-2">{error}</p>}

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-md hover:bg-accent/90 disabled:opacity-50"
                  >
                    {loading ? "Creating..." : "Create"}
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}

      {/* Edit Vendor Modal */}
      {isEditModalOpen && (
        <Dialog
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 mb-4"
              >
                Edit Vendor
              </Dialog.Title>

              <form onSubmit={handleUpdateVendor}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={editFormData.name}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          name: e.target.value,
                        })
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-accent focus:outline-none focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      required
                      value={editFormData.address}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          address: e.target.value,
                        })
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-accent focus:outline-none focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={editFormData.phone}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          phone: e.target.value,
                        })
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-accent focus:outline-none focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={editFormData.email}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          email: e.target.value,
                        })
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-accent focus:outline-none focus:ring-accent"
                    />
                  </div>
                </div>

                {error && <p className="text-red-500 mt-2">{error}</p>}

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-md hover:bg-accent/90 disabled:opacity-50"
                  >
                    {loading ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default VendorSearch;
