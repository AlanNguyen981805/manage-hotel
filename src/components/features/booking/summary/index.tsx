import { Price } from "@/components/ui/price";

export const SummaryBooking = ({ total }: { total: number }) => {
  return (
    <div className="p-4 border rounded-lg">
      <Price value={total || 0} label="Tổng tiền" size="lg" className="mt-4" />
    </div>
  );
};
