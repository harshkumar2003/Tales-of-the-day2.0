"use client"

import { useRef } from "react"
import html2canvas from "html2canvas"
import toast from "react-hot-toast"
import {ArrowDownToLine} from "lucide-react"
const TaleCardVariants = ({ title, content, date, variant = "gradient", size = "standard" }) => {
  const cardRef = useRef(null)

  // Simple download function that avoids color issues
  const downloadCard = async () => {
    if (!cardRef.current) return

    try {
      // Wait a bit for any animations to complete
      await new Promise((resolve) => setTimeout(resolve, 100))

      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: false,
        foreignObjectRendering: false,
        removeContainer: true,
        ignoreElements: (element) => {
          // Ignore button elements to avoid capturing them
          return (
            element.tagName === "BUTTON" ||
            element.classList.contains("download-button") ||
            element.classList.contains("share-button")
          )
        },
        onclone: (clonedDoc) => {
          // Fix all gradient backgrounds in the cloned document
          const elements = clonedDoc.querySelectorAll("*")
          elements.forEach((el) => {
            const computedStyle = window.getComputedStyle(el)

            // Replace gradient backgrounds with solid colors
            if (computedStyle.backgroundImage && computedStyle.backgroundImage.includes("gradient")) {
              // Set a solid background color based on the variant
              switch (variant) {
                case "nature":
                  el.style.backgroundColor = "#059669" // emerald-600
                  break
                case "cosmic":
                  el.style.backgroundColor = "#581c87" // purple-900
                  break
                case "sunset":
                  el.style.backgroundColor = "#dc2626" // red-600
                  break
                case "ocean":
                  el.style.backgroundColor = "#0891b2" // cyan-600
                  break
                case "rose":
                  el.style.backgroundColor = "#f43f5e" // rose-500
                  break
                case "forest":
                  el.style.backgroundColor = "#15803d" // green-700
                  break
                case "galaxy":
                  el.style.backgroundColor = "#1e3a8a" // blue-900
                  break
                case "autumn":
                  el.style.backgroundColor = "#dc2626" // red-600
                  break
                case "winter":
                  el.style.backgroundColor = "#93c5fd" // blue-300
                  break
                case "minimal":
                  el.style.backgroundColor = "#374151" // gray-700
                  break
                default:
                  el.style.backgroundColor = "#4f46e5" // indigo-600
              }
              el.style.backgroundImage = "none"
            }
          })
        },
      })

      // Create download link
      const link = document.createElement("a")
      link.download = `tale-card-${title.replace(/\s+/g, "-").toLowerCase()}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()

      toast.success("🎉 Card downloaded successfully!")
    } catch (error) {
      console.error("Error downloading card:", error)

      // Try alternative method
      try {
        await downloadCardSimple()
      } catch (altError) {
        console.error("Alternative download also failed:", altError)
        toast.error("❌ Download failed. Please try a different browser or refresh the page.")
      }
    }
  }

  // Ultra-simple download method
  const downloadCardSimple = async () => {
    if (!cardRef.current) return

    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: null,
      scale: 1,
      logging: false,
      useCORS: false,
      allowTaint: true,
      foreignObjectRendering: false,
      removeContainer: false,
      width: cardRef.current.offsetWidth,
      height: cardRef.current.offsetHeight,
    })

    const link = document.createElement("a")
    link.download = `tale-card-${title.replace(/\s+/g, "-").toLowerCase()}.png`
    link.href = canvas.toDataURL("image/png", 0.8)
    link.click()

    toast.success("🎉 Card downloaded successfully!")
  }

  // Share function
  const shareCard = async () => {
    try {
      await downloadCardSimple()
      toast.success("📤 Card ready for sharing!")
    } catch (error) {
      console.error("Error sharing card:", error)
      toast.error("❌ Failed to prepare card for sharing.")
    }
  }

  const getThemeStyles = () => {
    // Use inline styles instead of Tailwind classes to avoid oklch issues
    switch (variant) {
      case "nature":
        return {
          background: {
            background: "linear-gradient(135deg, #10b981 0%, #059669 50%, #0f766e 100%)",
          },
          accent: {
            background: "linear-gradient(90deg, #34d399 0%, #10b981 50%, #14b8a6 100%)",
          },
        }
      case "cosmic":
        return {
          background: {
            background: "linear-gradient(135deg, #312e81 0%, #581c87 50%, #be185d 100%)",
          },
          accent: {
            background: "linear-gradient(90deg, #a78bfa 0%, #ec4899 50%, #6366f1 100%)",
          },
        }
      case "sunset":
        return {
          background: {
            background: "linear-gradient(135deg, #f97316 0%, #ef4444 50%, #ec4899 100%)",
          },
          accent: {
            background: "linear-gradient(90deg, #fb923c 0%, #f87171 50%, #f472b6 100%)",
          },
        }
      case "ocean":
        return {
          background: {
            background: "linear-gradient(135deg, #3b82f6 0%, #0891b2 50%, #0f766e 100%)",
          },
          accent: {
            background: "linear-gradient(90deg, #60a5fa 0%, #22d3ee 50%, #2dd4bf 100%)",
          },
        }
      case "rose":
        return {
          background: {
            background: "linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #ef4444 100%)",
          },
          accent: {
            background: "linear-gradient(90deg, #f472b6 0%, #fb7185 50%, #f87171 100%)",
          },
        }
      case "forest":
        return {
          background: {
            background: "linear-gradient(135deg, #166534 0%, #15803d 50%, #047857 100%)",
          },
          accent: {
            background: "linear-gradient(90deg, #4ade80 0%, #10b981 50%, #14b8a6 100%)",
          },
        }
      case "galaxy":
        return {
          background: {
            background: "linear-gradient(135deg, #581c87 0%, #1e3a8a 50%, #312e81 100%)",
          },
          accent: {
            background: "linear-gradient(90deg, #a78bfa 0%, #60a5fa 50%, #6366f1 100%)",
          },
        }
      case "autumn":
        return {
          background: {
            background: "linear-gradient(135deg, #ea580c 0%, #dc2626 50%, #ca8a04 100%)",
          },
          accent: {
            background: "linear-gradient(90deg, #fb923c 0%, #f87171 50%, #facc15 100%)",
          },
        }
      case "winter":
        return {
          background: {
            background: "linear-gradient(135deg, #bfdbfe 0%, #93c5fd 50%, #60a5fa 100%)",
          },
          accent: {
            background: "linear-gradient(90deg, #dbeafe 0%, #ffffff 50%, #dbeafe 100%)",
          },
        }
      case "minimal":
        return {
          background: {
            background: "linear-gradient(135deg, #1f2937 0%, #111827 50%, #000000 100%)",
          },
          accent: {
            background: "linear-gradient(90deg, #6b7280 0%, #ffffff 50%, #6b7280 100%)",
          },
        }
      default: // gradient
        return {
          background: {
            background: "linear-gradient(135deg, #9333ea 0%, #2563eb 50%, #3730a3 100%)",
          },
          accent: {
            background: "linear-gradient(90deg, #a78bfa 0%, #60a5fa 50%, #6366f1 100%)",
          },
        }
    }
  }

  const getSizeConfig = () => {
    switch (size) {
      case "small":
        return {
          container: { maxWidth: "20rem" },
          padding: "1rem",
          titleSize: "1.125rem",
          contentSize: "0.75rem",
          dateSize: "0.75rem",
        }
      case "large":
        return {
          container: { maxWidth: "32rem" },
          padding: "2.5rem",
          titleSize: "1.875rem",
          contentSize: "1rem",
          dateSize: "0.875rem",
        }
      case "story":
        return {
          container: { maxWidth: "20rem", height: "24rem" },
          padding: "1.5rem",
          titleSize: "1.25rem",
          contentSize: "0.875rem",
          dateSize: "0.75rem",
        }
      case "square":
        return {
          container: { maxWidth: "28rem", aspectRatio: "1" },
          padding: "2rem",
          titleSize: "1.5rem",
          contentSize: "0.875rem",
          dateSize: "0.75rem",
        }
      default: // standard
        return {
          container: { maxWidth: "24rem" },
          padding: "1.5rem",
          titleSize: "1.25rem",
          contentSize: "0.875rem",
          dateSize: "0.75rem",
        }
    }
  }

  const themeStyles = getThemeStyles()
  const sizeConfig = getSizeConfig()

  const getDecorations = () => {
    const decorationStyle = {
      position: "absolute",
      zIndex: 10,
    }

    switch (variant) {
      case "nature":
        return (
          <>
            <div style={{ ...decorationStyle, top: "1rem", right: "1rem", fontSize: "1.875rem" }}>🌿</div>
            <div style={{ ...decorationStyle, bottom: "1rem", left: "1rem", fontSize: "1.5rem" }}>🌸</div>
            <div style={{ ...decorationStyle, top: "50%", left: "25%", fontSize: "1.25rem", opacity: 0.4 }}>🦋</div>
            <div style={{ ...decorationStyle, top: "33%", right: "33%", fontSize: "1.125rem", opacity: 0.3 }}>🍃</div>
          </>
        )
      case "cosmic":
        return (
          <>
            <div style={{ ...decorationStyle, top: "1.5rem", right: "1.5rem", fontSize: "1.5rem" }}>⭐</div>
            <div style={{ ...decorationStyle, top: "3rem", right: "3rem", fontSize: "1.125rem" }}>✨</div>
            <div style={{ ...decorationStyle, bottom: "2rem", left: "1.5rem", fontSize: "1.5rem" }}>🌙</div>
            <div style={{ ...decorationStyle, top: "33%", left: "33%", fontSize: "1.125rem", opacity: 0.6 }}>🪐</div>
            <div style={{ ...decorationStyle, bottom: "33%", right: "25%", fontSize: "0.875rem", opacity: 0.4 }}>
              💫
            </div>
          </>
        )
      case "sunset":
        return (
          <>
            <div style={{ ...decorationStyle, top: "1rem", right: "1rem", fontSize: "1.875rem" }}>🌅</div>
            <div style={{ ...decorationStyle, bottom: "1.5rem", left: "1.5rem", fontSize: "1.5rem" }}>🏔️</div>
            <div style={{ ...decorationStyle, top: "50%", right: "25%", fontSize: "1.25rem", opacity: 0.5 }}>☀️</div>
          </>
        )
      case "ocean":
        return (
          <>
            <div style={{ ...decorationStyle, top: "1rem", right: "1rem", fontSize: "1.875rem" }}>🌊</div>
            <div style={{ ...decorationStyle, bottom: "1rem", left: "1rem", fontSize: "1.5rem" }}>🐚</div>
            <div style={{ ...decorationStyle, top: "50%", right: "33%", fontSize: "1.25rem", opacity: 0.5 }}>🐠</div>
            <div style={{ ...decorationStyle, bottom: "33%", left: "33%", fontSize: "1.125rem", opacity: 0.4 }}>🦈</div>
          </>
        )
      case "rose":
        return (
          <>
            <div style={{ ...decorationStyle, top: "1rem", right: "1rem", fontSize: "1.875rem" }}>🌹</div>
            <div style={{ ...decorationStyle, bottom: "1rem", left: "1rem", fontSize: "1.5rem" }}>💖</div>
            <div style={{ ...decorationStyle, top: "50%", left: "25%", fontSize: "1.25rem", opacity: 0.5 }}>🦋</div>
          </>
        )
      case "forest":
        return (
          <>
            <div style={{ ...decorationStyle, top: "1rem", right: "1rem", fontSize: "1.875rem" }}>🌲</div>
            <div style={{ ...decorationStyle, bottom: "1rem", left: "1rem", fontSize: "1.5rem" }}>🍃</div>
            <div style={{ ...decorationStyle, top: "50%", left: "25%", fontSize: "1.25rem", opacity: 0.5 }}>🦉</div>
            <div style={{ ...decorationStyle, bottom: "33%", right: "33%", fontSize: "1.125rem", opacity: 0.4 }}>🐿️</div>
          </>
        )
      case "galaxy":
        return (
          <>
            <div style={{ ...decorationStyle, top: "1rem", right: "1rem", fontSize: "1.5rem" }}>🌌</div>
            <div style={{ ...decorationStyle, top: "25%", left: "25%", fontSize: "1.125rem" }}>⭐</div>
            <div style={{ ...decorationStyle, bottom: "33%", right: "25%", fontSize: "1.25rem" }}>🚀</div>
            <div style={{ ...decorationStyle, top: "50%", right: "50%", fontSize: "0.875rem", opacity: 0.6 }}>✨</div>
          </>
        )
      case "autumn":
        return (
          <>
            <div style={{ ...decorationStyle, top: "1rem", right: "1rem", fontSize: "1.875rem" }}>🍂</div>
            <div style={{ ...decorationStyle, bottom: "1rem", left: "1rem", fontSize: "1.5rem" }}>🍁</div>
            <div style={{ ...decorationStyle, top: "50%", left: "33%", fontSize: "1.25rem", opacity: 0.5 }}>🌰</div>
          </>
        )
      case "winter":
        return (
          <>
            <div style={{ ...decorationStyle, top: "1rem", right: "1rem", fontSize: "1.875rem" }}>❄️</div>
            <div style={{ ...decorationStyle, bottom: "1rem", left: "1rem", fontSize: "1.5rem" }}>⛄</div>
            <div style={{ ...decorationStyle, top: "50%", right: "33%", fontSize: "1.25rem", opacity: 0.6 }}>🌨️</div>
          </>
        )
      case "minimal":
        return (
          <div
            style={{
              ...decorationStyle,
              top: "1rem",
              right: "1rem",
              width: "2rem",
              height: "2rem",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "50%",
            }}
          ></div>
        )
      default:
        return (
          <>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "8rem",
                height: "8rem",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "50%",
                transform: "translate(-4rem, -4rem)",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "6rem",
                height: "6rem",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "50%",
                transform: "translate(3rem, 3rem)",
              }}
            ></div>
          </>
        )
    }
  }

  return (
    <div style={{ position: "relative", width: "100%", margin: "0 auto" }}>
      {/* Card Container */}
      <div
        ref={cardRef}
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "1rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          ...sizeConfig.container,
        }}
      >
        {/* Background with theme */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            ...themeStyles.background,
          }}
        >
          {/* Decorative pattern overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.1,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "8rem",
                height: "8rem",
                backgroundColor: "white",
                borderRadius: "50%",
                transform: "translate(-4rem, -4rem)",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                top: "5rem",
                right: 0,
                width: "6rem",
                height: "6rem",
                backgroundColor: "white",
                borderRadius: "50%",
                transform: "translate(3rem, -3rem)",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: "33%",
                width: "10rem",
                height: "10rem",
                backgroundColor: "white",
                borderRadius: "50%",
                transform: "translateY(5rem)",
              }}
            ></div>
          </div>
          {/* Theme-specific decorations */}
          {getDecorations()}
        </div>

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            padding: sizeConfig.padding,
            color: "white",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Header with decorative elements */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: "0.5rem", height: "0.5rem", backgroundColor: "#fde047", borderRadius: "50%" }}></div>
              <div style={{ width: "0.5rem", height: "0.5rem", backgroundColor: "#f9a8d4", borderRadius: "50%" }}></div>
              <div style={{ width: "0.5rem", height: "0.5rem", backgroundColor: "#86efac", borderRadius: "50%" }}></div>
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: "500",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                padding: "0.25rem 0.75rem",
                borderRadius: "9999px",
                backdropFilter: "blur(4px)",
              }}
            >
              📚 My Tale
            </div>
          </div>

          {/* Main Content */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {/* Title */}
            <h1
              style={{
                fontSize: sizeConfig.titleSize,
                fontWeight: "bold",
                marginBottom: "1rem",
                lineHeight: "1.2",
                letterSpacing: "-0.025em",
              }}
            >
              {title}
            </h1>

            {/* Content */}
            <div style={{ marginBottom: "1.5rem" }}>
              <p
                style={{
                  fontSize: sizeConfig.contentSize,
                  lineHeight: "1.6",
                  color: "rgba(255, 255, 255, 0.9)",
                  display: "-webkit-box",
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {content}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "1rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: sizeConfig.dateSize,
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              <span style={{ color: "#fde047" }}>📅</span>
              <span style={{ fontWeight: "500" }}>{date}</span>
            </div>
            <div
              style={{
                fontSize: sizeConfig.dateSize,
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              ✨ Created with love
            </div>
          </div>

          {/* Bottom decorative border */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "0.25rem",
              ...themeStyles.accent,
            }}
          ></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
          gap: "0.75rem",
        }}
      >
        <button
          onClick={downloadCard}
          className="download-button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#2563eb",
            color: "white",
            fontSize: "0.875rem",
            borderRadius: "0.5rem",
            border: "none",
            cursor: "pointer",
            fontWeight: "500",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
        >
          
         <ArrowDownToLine/> Download
        </button>
       
      </div>
    </div>
  )
}

export default TaleCardVariants
