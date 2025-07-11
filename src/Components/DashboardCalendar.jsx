import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { isSameDay } from "date-fns";

const tales = {
  "2025-07-06": "A warrior rises with the sun...",
  "2025-07-05": "The silent storm within...",
};

function DashboardCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTale, setSelectedTale] = useState("");

  const formatDate = (date) => date.toISOString().split("T")[0];

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const key = formatDate(date);
    setSelectedTale(tales[key] || "");
  };

  return (
    <div className="mt-10 justify-self-center px-4 mb-10">
      <Calendar
  value={selectedDate}
  onClickDay={handleDateClick}
  className="
    sm:!w-xl md:!w-2xl lg:!w-2xl xl:!w-2xl 2xl:!w-2xl
    !backdrop-blur-md
    !bg-white/80 dark:!bg-[#0e0e0e]/90
    !text-gray-900 dark:!text-gray-100
    !shadow-2xl !rounded-2xl
    !border border-white/30 dark:!border-white/10
    transition-all duration-300 ease-in-out
  "
  tileClassName={({ date }) => {
    const isSelected = isSameDay(date, selectedDate);
    const isToday = isSameDay(date, new Date());

    return [
      // 🔵 Selected date styling
      isSelected &&
        "!bg-blue-600 !text-white rounded-full font-semibold shadow-md hover:!bg-blue-700 transition-all duration-200",

      // 🌞🌚 Today (not selected)
      !isSelected && isToday
        ? "font-semibold border border-blue-400 dark:border-blue-500 rounded-full bg-gray-100/70 dark:bg-white/10"
        : "",

      // ✍️ Base transition for hover
      "hover:brightness-110 transition-all duration-200 ease-in-out",
    ]
      .filter(Boolean)
      .join(" ");
  }}
  tileContent={({ date, view }) => {
    const key = formatDate(date);
    if (view === "month" && tales[key]) {
      return (
        <div className="flex justify-center items-center mt-1">
          <span className="w-2 h-2 rounded-full bg-green-400 dark:bg-green-500"></span>
        </div>
      );
    }
    return null;
  }}
/>


      
    </div>
  );
}

export default DashboardCalendar;
