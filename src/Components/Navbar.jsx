
import ThemeToggle from '../Components/ThemeToggle';
import { BookOpen } from "lucide-react";
import {Link} from 'react-router-dom'
import {useEffect ,useState } from 'react';
const Navbar = ()=>{
    const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10); // change at 10px
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
    return(
        <div className={`p-4 border-b border-gray-300 dark:border-gray-700 shadow-sm sticky top-0 w-full z-50 transition-all duration-300 ${
  isScrolled
    ? "dark:bg-black bg-white border-gray-700 shadow-md"
    : "bg-transparent border-transparent"
}`}>
            <div className="flex justify-between items-center md:ml-6 md:mr-6">
               <div className='flex justify-between items-center space-x-3 '>
                    <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400 items-center" />
                    <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Tales Of the Day</h1>
               </div>
               <div className='flex  items-center space-x-3'>
                    <ThemeToggle />
                    <Link to="/login">
                        <button className='text-white p-3 rounded-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'>Get Started</button>
                    </Link>
               </div>

            </div>
        </div>
    )
}
export default Navbar;