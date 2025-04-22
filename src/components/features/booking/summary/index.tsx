import { Price } from "@/components/ui/price";

interface VendorInfo {
  name: string;
  address?: string;
  phone?: string;
  email?: string;
}

export const SummaryBooking = ({
  total,
  vendor,
}: {
  total: number;
  vendor?: VendorInfo;
}) => {
  return (
    <div className="p-4 border rounded-lg space-y-4">
      {vendor && (
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Thông tin nhà cung cấp</h3>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">Tên:</span> {vendor.name}
            </p>
            {vendor.address && (
              <p className="text-sm">
                <span className="font-medium">Địa chỉ:</span> {vendor.address}
              </p>
            )}
            {vendor.phone && (
              <p className="text-sm">
                <span className="font-medium">Điện thoại:</span> {vendor.phone}
              </p>
            )}
            {vendor.email && (
              <p className="text-sm">
                <span className="font-medium">Email:</span> {vendor.email}
              </p>
            )}
          </div>
        </div>
      )}
      <div className="border-t pt-4">
        <Price value={total || 0} label="Tổng tiền" size="lg" />
      </div>
    </div>
  );
};
