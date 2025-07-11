import { useState } from "react";
import Navbar from "../Components/Navbar";
import { useUser } from "../context/UserContext";
import UserWelcome from "../Components/UserWelcome";
import DasboardNav from "../Components/DasboardNav";
import DashboardCalendar from "../Components/DashboardCalendar";
import TaleInput from '../Components/TaleInput'; 

function Dashboard() {
  const { user, loading } = useUser();
  const [activeTab, setActiveTab] = useState("calendar");

  const renderTabContent = () => {
    switch (activeTab) {
      case "calendar":
        return <DashboardCalendar />;
      case "write":
        return <TaleInput />;
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
