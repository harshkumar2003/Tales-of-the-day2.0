import { BookOpen, Sparkles } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black transition-colors duration-300">
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center gap-2 animate-pulse">
          <BookOpen className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          <Sparkles className="h-6 w-6 text-blue-500 dark:text-blue-400" />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Tales of the Day
        </h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 dark:border-purple-400 mx-auto"></div>
      </div>
    </div>
  );
}
