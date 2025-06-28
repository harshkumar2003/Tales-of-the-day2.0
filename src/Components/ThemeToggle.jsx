import { useState,useEffect } from "react"
import {Sun , Moon} from "lucide-react";
function ThemeToggle() {
    const [theme , setThmem] = useState(()=>{
        if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark"; // 🌑 Default to dark
    }
    return "dark";
    });
    useEffect(()=>{
        const root = window.document.documentElement;
        if(theme == 'dark')
        {
            root.classList.add('dark');
        }
        else
        {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    },[theme])

    
    const toggleTheme = ()=>{
        setThmem(prev => (prev ==='dark' ? 'light' : 'dark'));
    };
    
  return (
    <button onClick={toggleTheme} className=" ">
        {theme === 'dark' ? <Sun className="text-white"/> : <Moon/>}
    </button>
  )
}

export default ThemeToggle
