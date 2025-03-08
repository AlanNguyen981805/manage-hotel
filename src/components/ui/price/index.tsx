import { formatCurrency } from "@/helpers/currency-helper";

interface PriceProps {
  value: number;
  className?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  align?: "left" | "right" | "center";
}

export const Price = ({
  value,
  className = "",
  label = "Giá",
  size = "md",
  showLabel = true,
  align = "right",
}: PriceProps) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const alignClasses = {
    left: "text-left",
    right: "text-right",
    center: "text-center",
  };

  return (
    <div className={`flex flex-col gap-1 ${alignClasses[align]} ${className}`}>
      {showLabel && <p className="text-gray-600">{label}</p>}
      <p className={`font-bold ${sizeClasses[size]}`}>
        {formatCurrency(value || 0)}
      </p>
    </div>
  );
};
