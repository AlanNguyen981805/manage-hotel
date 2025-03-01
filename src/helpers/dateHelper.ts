export const calculateDaysBetweenDates = (date1: Date, date2: Date): number => {
  if (!date1 || !date2) return 0;

  const dayInMs = 24 * 60 * 60 * 1000; // Số mili giây trong một ngày
  const diffInMs = Math.abs(new Date(date2) - new Date(date1)); // Chênh lệch thời gian giữa hai ngày
  return Math.floor(diffInMs / dayInMs) + 1; // Chia chênh lệch cho số mili giây trong một ngày và cộng thêm 1 để tính đủ cả hai ngày
};
