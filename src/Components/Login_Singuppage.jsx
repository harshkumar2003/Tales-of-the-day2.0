import { BookOpen, Sparkles } from 'lucide-react'
import React from 'react'
import ThemeToggle from '../Components/ThemeToggle'
function Login_Singuppage() {
  return (
      <div className=''>
            <div className='pt-2 flex justify-end p-2 '>
                      <ThemeToggle/>
                    </div>
              <div className='flex justify-center items-center gap-2 mb-4 '>
                <BookOpen className='h-8 w-8 text-purple-600 dark:text-purple-400'/>
                <Sparkles className='h-6 w-6 text-blue-500 dark:text-blue-400'/>
            </div>
            <div className='text-center p-2 lg:w-md justify-self-center'>
              <h1 className='text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'>Tales of the Day</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
            Your digital sanctuary for daily reflections and motivational stories
          </p>
            </div>
      </div>
  )
}

export default Login_Singuppage
