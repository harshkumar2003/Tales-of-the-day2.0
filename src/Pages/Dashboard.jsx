import { useState } from "react";
import Navbar from "../Components/Navbar";
import { useUser } from "../context/UserContext";
import UserWelcome from "../Components/UserWelcome";
import DasboardNav from "../Components/DasboardNav";
import DashboardCalendar from "../Components/DashboardCalendar";
import TaleInput from "../Components/TaleInput";
import TaleViewer from "../Components/TaleViewer";

function Dashboard() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("calendar");
  const [selectedTale, setSelectedTale] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  // Called when a date is selected in the calendar
 const handleDateSelect = (date, tale) => {
  setSelectedDate(date);
  setSelectedTale(tale); // now this will have value!
  setActiveTab("view");
};


  // Called after a tale is saved in TaleInput
  const handleTaleSaved = (tale) => {
    setSelectedTale(tale);
    setActiveTab("view"); // Switch to viewer
  };

  // Go back to calendar view
  const handleBackToCalendar = () => {
    setSelectedTale(null);
    setSelectedDate(null);
    setActiveTab("calendar");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "calendar":
        return <DashboardCalendar user={user} onDateSelect={handleDateSelect} />;
      case "write":
        return (
          <TaleInput
            date={selectedDate}
            onTaleSaved={handleTaleSaved}
          />
        );
      case "view":
        return (
          <TaleViewer
            tale={selectedTale}
            date={selectedDate}
            user={user}
            onBack={handleBackToCalendar}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <DasboardNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <UserWelcome user={user} />
      {renderTabContent()}
    </>
  );
}

export default Dashboard;
