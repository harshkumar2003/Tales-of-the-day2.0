import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { isSameDay } from "date-fns";
import { getTalesByDate, getUserTales } from "../services/taleService";
import { CalendarIcon } from "lucide-react";

function DashboardCalendar({ user, onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [markedDates, setMarkedDates] = useState({});

  // 🔹 Use local date format (yyyy-MM-dd) to match tales dateKey
  const formatDateLocal = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;
  };

  // Fetch user's tales grouped by local date keys when user changes
  useEffect(() => {
    const fetchTales = async () => {
      if (!user?.uid) return;

      try {
        const { groupedTalesByDate } = await getUserTales(user.uid);
        console.log("✅ Grouped Tales By Date:", groupedTalesByDate);
        setMarkedDates(groupedTalesByDate || {});
      } catch (error) {
        console.error("Error fetching tales on calendar init:", error);
      }
    };

    fetchTales();
  }, [user]);

  // Handle clicking a day in calendar
  const handleDateClick = async (date) => {
    setSelectedDate(date);

    try {
      const tales = await getTalesByDate(date, user.uid);
      const tale = tales?.[0] || null;
      onDateSelect(date, tale);
    } catch (error) {
      console.error("Error fetching tale for selected date:", error);
      onDateSelect(date, null);
    }
  };

  return (
    <div className="mt-10 pb-4 px-4 flex flex-col items-center justify-self-center">
      <div className="flex items-center mb-4 gap-2">
        <CalendarIcon className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Select a Date to View Tale
        </h2>
      </div>

      <Calendar
        value={selectedDate}
        onClickDay={handleDateClick}
        className="
          sm:!w-xl md:!w-2xl lg:!w-2xl xl:!w-2xl 2xl:!w-2xl
          !bg-white/80 dark:!bg-[#0e0e0e]/90
          !backdrop-blur-md !rounded-2xl !shadow-2xl
          !text-gray-900 dark:!text-gray-100
          !border border-white/30 dark:!border-white/10
          transition-all duration-300 ease-in-out
        "
        tileClassName={({ date }) => {
          const classes = [];

          if (isSameDay(date, selectedDate)) {
            classes.push(
              "!bg-blue-600 !text-white rounded-full font-semibold shadow-md hover:!bg-blue-700"
            );
          } else if (isSameDay(date, new Date())) {
            classes.push(
              "font-semibold border border-blue-400 dark:border-blue-500 rounded-full bg-gray-100/70 dark:bg-white/10"
            );
          }

          classes.push(
            "hover:brightness-110 transition-all duration-200 ease-in-out"
          );

          return classes.join(" ");
        }}
        tileContent={({ date, view }) => {
          if (view === "month") {
            const key = formatDateLocal(date);
            if (markedDates[key]) {
              return (
                <div className="flex justify-center items-center pt-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                </div>
              );
            }
          }
          return null;
        }}
      />
    </div>
  );
}

export default DashboardCalendar;
