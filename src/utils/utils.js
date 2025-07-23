// utils/utils.js
export const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split("T")[0]; // Returns "2025-07-23"
};
