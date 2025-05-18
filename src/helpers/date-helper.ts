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
  console.log("date :>> ", date);
  const dateObj = new Date(date);

  // Lấy ngày theo múi giờ Việt Nam (UTC+7)
  const vnDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(dateObj);

  return vnDate; // Trả về dạng YYYY-MM-DD
};
