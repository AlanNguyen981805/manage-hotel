export const calculateDaysBetweenDates = (
  date1: Date | null,
  date2: Date | null
): number => {
  if (!date1 || !date2) return 0;
  const dayInMs = 24 * 60 * 60 * 1000; // Số mili giây trong một ngày
  const diffInMs = Math.abs(date2.getTime() - date1.getTime()); // Chênh lệch thời gian giữa hai ngày
  return Math.floor(diffInMs / dayInMs) + 1; // Chia chênh lệch cho số mili giây trong một ngày và cộng thêm 1 để tính đủ cả hai ngày
};

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatDateNoUtc = (date: Date | string) => {
  // Chuyển đổi sang Date mà không bị lệch múi giờ
  const dateObj = new Date(date);

  // Lấy thông tin ngày tháng năm theo UTC để tránh bị lệch
  const year = dateObj.getUTCFullYear();
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
