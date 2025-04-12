export const formatCurrency = (value: number) => {
  // Format with the currency symbol, then replace the '₫' symbol with empty string
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  })
    .format(value)
    .replace("₫", "")
    .trim();
};
