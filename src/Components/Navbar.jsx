import ThemeToggle from "../Components/ThemeToggle";
import { BookOpen, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import toast from "react-hot-toast";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, loading } = useUser();
  const handleLogout = () => {
    signOut(auth)
      .then(() => toast.success("Get Back Soon..."))
      .catch((error) => {
        toast.error(error.message || "Something went wrong");
      });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10); // change at 10px
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return null;
  return (
    <div
      className={`p-4 border-b border-gray-300 dark:border-gray-700 shadow-sm sticky top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "dark:bg-black bg-white border-gray-700 shadow-md"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="flex justify-between items-center md:ml-6 md:mr-6">
        <div className="flex justify-between items-center space-x-3 ">
          <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400 items-center" />
          <Link to="/Dashboard"><h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Tales Of the Day
          </h1></Link>
        </div>
        <div className="flex  items-center space-x-3">
          <ThemeToggle />
          {user ? (
            <>
              
              <button
                onClick={handleLogout}
                className="cursor-pointer text-white p-3 rounded-full font-bold bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800"
              >
                <LogOut />
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="cursor-pointer text-white p-3 rounded-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Get Started
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
