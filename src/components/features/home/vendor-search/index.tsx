"use client";

import { useState, useEffect, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/config";
import useBookingState from "@/store/useRoomState";

interface Vendor {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
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

  // Thêm ref để quản lý dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Fetch all vendors when component mounts
  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(`${API_ENDPOINTS.VENDORS}`);
        setVendors(response.data.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
        setError("Failed to fetch vendors");
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

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
    } catch (error) {
      console.error("Error creating vendor:", error);
      setError("Failed to create vendor");
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
  };

  return (
    <div className="flex-1 flex flex-col bg-white p-4 rounded-lg shadow w-full">
      <h3 className="font-medium mb-2 w-[200px]">Tìm kiếm Vendor</h3>
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
          placeholder="Nhập tên vendor..."
          className="w-full p-2 border rounded-md focus:ring-accent focus:border-accent"
        />

        {/* Selected Vendor Info */}
        {selectedVendor && (
          <div className="mt-2 p-2 bg-gray-50 border rounded-md">
            <div className="font-medium text-accent">{selectedVendor.name}</div>
            <div className="text-sm">
              <div>{selectedVendor.address}</div>
              <div>SĐT: {selectedVendor.phone}</div>
              <div>Email: {selectedVendor.email}</div>
            </div>
          </div>
        )}

        {/* Vendor List */}
        {isDropdownVisible && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
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
                  <button
                    type="button"
                    onClick={(e) => handleSelectVendor(e, vendor)}
                    className="bg-accent text-white py-1 px-3 rounded-md hover:bg-accent/90 ml-2"
                  >
                    Chọn
                  </button>
                </div>
              ))
            ) : (
              <div className="p-4">
                <p className="text-gray-600 mb-2">Không tìm thấy vendor</p>
                <button
                  onClick={openCreateModal}
                  className="w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-accent/90"
                >
                  Tạo mới Vendor
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create Vendor Modal - Tách riêng khỏi dropdown */}
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
                Tạo mới Vendor
              </Dialog.Title>

              <form onSubmit={handleCreateVendor}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Tên
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
                      Địa chỉ
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
                      Số điện thoại
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
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-md hover:bg-accent/90 disabled:opacity-50"
                  >
                    {loading ? "Đang tạo..." : "Tạo mới"}
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
