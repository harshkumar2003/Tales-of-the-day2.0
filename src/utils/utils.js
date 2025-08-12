// utils/utils.js
export const formatDate = (date) => {
  const d = new Date(date);
  const istOffsetMs = 5.5 * 60 * 60 * 1000; // IST = UTC+5:30
  const istDate = new Date(d.getTime() + istOffsetMs);

  const year = istDate.getFullYear();
  const month = String(istDate.getMonth() + 1).padStart(2, "0");
  const day = String(istDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`; // Example: "2025-08-12"
};
