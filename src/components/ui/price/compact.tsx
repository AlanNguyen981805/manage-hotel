import { formatCurrency } from "@/helpers/currency-helper";

interface CompactPriceProps {
  value: number;
  className?: string;
}

export const CompactPrice = ({ value, className = "" }: CompactPriceProps) => {
  return (
    <span className={`font-semibold ${className}`}>
      {formatCurrency(value || 0)}
    </span>
  );
};
