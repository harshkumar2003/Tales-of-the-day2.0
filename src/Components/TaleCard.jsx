

const TaleCard = ({ title, content, date, variant = "gradient" }) => {
  const getThemeConfig = () => {
    switch (variant) {
      case "nature":
        return {
          background: "bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700",
          decorations: (
            <>
              <div className="absolute top-4 right-4 text-2xl">🌿</div>
              <div className="absolute bottom-4 left-4 text-xl">🌸</div>
              <div className="absolute top-1/2 left-1/4 text-lg opacity-30">🦋</div>
            </>
          ),
        }
      case "cosmic":
        return {
          background: "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800",
          decorations: (
            <>
              <div className="absolute top-6 right-6 text-xl">⭐</div>
              <div className="absolute top-12 right-12 text-sm">✨</div>
              <div className="absolute bottom-8 left-6 text-lg">🌙</div>
              <div className="absolute top-1/3 left-1/3 text-xs opacity-60">🪐</div>
            </>
          ),
        }
      case "sunset":
        return {
          background: "bg-gradient-to-br from-orange-500 via-red-500 to-pink-600",
          decorations: (
            <>
              <div className="absolute top-4 right-4 text-2xl">🌅</div>
              <div className="absolute bottom-6 left-6 text-xl">🏔️</div>
            </>
          ),
        }
      case "ocean":
        return {
          background: "bg-gradient-to-br from-blue-500 via-cyan-600 to-teal-700",
          decorations: (
            <>
              <div className="absolute top-4 right-4 text-2xl">🌊</div>
              <div className="absolute bottom-4 left-4 text-xl">🐚</div>
              <div className="absolute top-1/2 right-1/3 text-lg opacity-40">🐠</div>
            </>
          ),
        }
      case "rose":
        return {
          background: "bg-gradient-to-br from-pink-500 via-rose-500 to-red-500",
          decorations: (
            <>
              <div className="absolute top-4 right-4 text-2xl">🌹</div>
              <div className="absolute bottom-4 left-4 text-xl">💖</div>
            </>
          ),
        }
      case "forest":
        return {
          background: "bg-gradient-to-br from-green-800 via-green-700 to-emerald-800",
          decorations: (
            <>
              <div className="absolute top-4 right-4 text-2xl">🌲</div>
              <div className="absolute bottom-4 left-4 text-xl">🍃</div>
              <div className="absolute top-1/2 left-1/4 text-lg opacity-40">🦉</div>
            </>
          ),
        }
      case "minimal":
        return {
          background: "bg-gradient-to-br from-gray-800 via-gray-900 to-black",
          decorations: <div className="absolute top-4 right-4 w-8 h-8 border-2 border-white/20 rounded-full"></div>,
        }
      default: // gradient
        return {
          background: "bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800",
          decorations: (
            <>
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-12 translate-y-12"></div>
            </>
          ),
        }
    }
  }

  const themeConfig = getThemeConfig()

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Card Container */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        {/* Background with theme */}
        <div className={`absolute inset-0 ${themeConfig.background}`}>
          {/* Decorative pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute top-20 right-0 w-24 h-24 bg-white rounded-full translate-x-12 -translate-y-12"></div>
            <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-white rounded-full translate-y-20"></div>
          </div>
          {/* Theme-specific decorations */}
          {themeConfig.decorations}
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 text-white">
          {/* Header with decorative elements */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
              <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
            </div>
            <div className="text-xs font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">📖 Tale</div>
          </div>

          {/* Title */}
          <h1 className="text-xl font-bold mb-3 leading-tight">{title}</h1>

          {/* Content */}
          <div className="mb-4">
            <p className="text-sm leading-relaxed text-white/90 line-clamp-4">{content}</p>
          </div>

          {/* Date and decorative footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-white/80">
              <span className="text-yellow-300">📅</span>
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-white/40 rounded-full"></div>
              <div className="w-1 h-1 bg-white/60 rounded-full"></div>
              <div className="w-1 h-1 bg-white/80 rounded-full"></div>
            </div>
          </div>

          {/* Bottom decorative border */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400"></div>
        </div>
      </div>

      {/* Download/Save button */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => {
            // Future: Implement download functionality
            console.log("Download card functionality to be implemented")
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Save Card
        </button>
      </div>
    </div>
  )
}

export default TaleCard
