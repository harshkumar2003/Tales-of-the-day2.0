import { BookOpen } from "lucide-react";
import React from "react";

const Footer = ()=>
{
    return(
        <div className="border-t  backdrop-blur-sm py-8 px-4 border-white/15">
            <div className="flex gap-3 justify-center pt-4">
                <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400"/>
                <h1 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Tales of the Day</h1>
            </div>
            <div className="text-center p-4">
                <p className="text-gray-600 dark:text-gray-300 mb-2">Your digital sanctuary for daily reflections and motivational stories</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Made with ❤️ for storytellers everywhere</p>
            </div>


        </div>
    )
}

export default Footer;