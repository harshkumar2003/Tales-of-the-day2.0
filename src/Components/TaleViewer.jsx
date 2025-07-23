"use client";

import { useEffect, useState } from "react";
import {
  getTalesByDate,
  deleteTale,
  updateTale,
} from "../services/taleService";
import { formatDate } from "../utils/utils";
import {
  Save,
  Pencil,
  Trash2,
  Palette,
  X,
  Calendar,
  Clock,
} from "lucide-react";
import TaleCardVariants from "./TaleCardVariants";
import toast from "react-hot-toast";

const TaleViewer = ({ date, onBack, user }) => {
  const [tales, setTales] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ title: "", content: "", category: "" });
  const [selectedTale, setSelectedTale] = useState(null);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("gradient");
  const [selectedSize, setSelectedSize] = useState("standard");

  // Available background themes with more options
  const backgroundThemes = [
    { id: "gradient", name: "Purple Gradient", emoji: "💜" },
    { id: "nature", name: "Nature Green", emoji: "🌿" },
    { id: "cosmic", name: "Cosmic Space", emoji: "🌌" },
    { id: "sunset", name: "Sunset Glow", emoji: "🌅" },
    { id: "ocean", name: "Ocean Blue", emoji: "🌊" },
    { id: "rose", name: "Rose Gold", emoji: "🌹" },
    { id: "forest", name: "Deep Forest", emoji: "🌲" },
    { id: "galaxy", name: "Galaxy", emoji: "🌌" },
    { id: "autumn", name: "Autumn", emoji: "🍂" },
    { id: "winter", name: "Winter", emoji: "❄️" },
    { id: "minimal", name: "Minimal Dark", emoji: "⚫" },
  ];

  // Available card sizes
  const cardSizes = [
    { id: "small", name: "Small", description: "Compact size" },
    { id: "standard", name: "Standard", description: "Default size" },
    { id: "large", name: "Large", description: "Big display" },
    { id: "square", name: "Square", description: "Social media" },
    { id: "story", name: "Story", description: "Instagram story" },
  ];

  useEffect(() => {
    const fetchTales = async () => {
      if (!date || !user?.uid) return;
      const fetchedTales = await getTalesByDate(date, user.uid);
      setTales(fetchedTales || []);
    };
    fetchTales();
  }, [date, user]);

  const handleDelete = async (id) => {
    try {
      await deleteTale(user.uid, id);
      setTales((prev) => prev.filter((t) => t.id !== id));
      toast.success("Tale deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete tale.");
    }
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    const tale = tales[index];
    setForm({
      title: tale.title,
      content: tale.content,
      category: tale.category,
    });
  };

  const handleEditSubmit = async (id) => {
    try {
      await updateTale(user.uid, id, form);
      const updatedTales = [...tales];
      updatedTales[editIndex] = { ...updatedTales[editIndex], ...form };
      setTales(updatedTales);
      setEditIndex(null);
      toast.success("💾 Tale updated successfully!");
    } catch (error) {
      toast.error("⚠️ Failed to update tale.");
    }
  };

  const handleCreateCard = (tale) => {
    setSelectedTale(tale);
    setShowThemeSelector(true);
  };

  const handleThemeSelect = (themeId) => {
    setSelectedTheme(themeId);
  };

  const handleSizeSelect = (sizeId) => {
    setSelectedSize(sizeId);
  };

  const handleGenerateCard = () => {
    setShowThemeSelector(false);
    toast.success(
      `🎨 Card created with ${
        backgroundThemes.find((t) => t.id === selectedTheme)?.name
      } theme!`
    );
  };

  return (
    <>
      <div className="lg:w-1/2 mx-auto mt-10 backdrop-blur-md bg-white/80 dark:bg-[#0e0e0e]/90 text-gray-900 dark:text-gray-100 shadow-2xl rounded-2xl border border-white/30 dark:border-white/10 p-6">
        <button
          onClick={onBack}
          className="text-blue-500 hover:underline mb-6 text-sm cursor-pointer"
        >
          ← Back to Calendar
        </button>

        {tales.length > 0 ? (
          tales.map((tale, index) => (
            <div
              key={tale.id}
              className="mb-6 p-0 rounded-2xl bg-white/90 dark:bg-black/40 border border-gray-300/50 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {editIndex === index ? (
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                        Title
                      </label>
                      <input
                        className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-black/40 border border-gray-300 dark:border-white/20 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        value={form.title}
                        onChange={(e) =>
                          setForm({ ...form, title: e.target.value })
                        }
                        placeholder="Title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                        Category
                      </label>
                      <input
                        className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-black/40 border border-gray-300 dark:border-white/20 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        value={form.category}
                        onChange={(e) =>
                          setForm({ ...form, category: e.target.value })
                        }
                        placeholder="Category"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                        Content
                      </label>
                      <textarea
                        rows="6"
                        className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-black/40 border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                        value={form.content}
                        onChange={(e) =>
                          setForm({ ...form, content: e.target.value })
                        }
                        placeholder="Your Tale"
                      />
                    </div>
                    <div className="flex justify-end items-center gap-3 pt-2">
                      <button
                        onClick={() => setEditIndex(null)}
                        className="cursor-pointer px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium transition-all duration-200 flex items-center gap-2"
                      >
                        <X size={16} />
                        Cancel
                      </button>
                      <button
                        onClick={() => handleEditSubmit(tale.id)}
                        className="cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg transition-all duration-200"
                      >
                        <Save size={16} />
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Header Section */}
                  <div className="p-6 pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold text-black dark:text-white mb-3 leading-tight">
                          {tale.title}
                        </h2>

                        {/* Category and Meta Info */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                              {tale.category}
                            </span>
                          </div>
                        </div>

                        {/* Date and Time */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            <span>{formatDate(new Date(tale.timestamp))}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock size={14} />
                            <span>
                              {new Date(tale.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleEditClick(index)}
                          className="cursor-pointer flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all duration-200"
                        >
                          <Pencil size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(tale.id)}
                          className="cursor-pointer flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="px-6 pb-4">
                    <div className="bg-white/80 dark:bg-[#0e0e0e]/90 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
                      <p className="text-black dark:text-white leading-relaxed whitespace-pre-line">
                        {tale.content}
                      </p>
                    </div>
                  </div>

                  {/* Footer with Create Card Button */}
                  <div className="px-6 pb-6">
                    <button
                      onClick={() => handleCreateCard(tale)}
                      className="cursor-pointer w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    >
                      <Palette size={18} />
                      Create Card
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">📖</div>
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              No tales found for this date
            </p>
          </div>
        )}
      </div>

      {/* Enhanced Theme & Size Selector Modal */}
      {showThemeSelector && selectedTale && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 ">
          <div className="bg-white dark:bg-black rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Customize Your Card
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Choose theme and size for your tale card
                  </p>
                </div>
                <button
                  onClick={() => setShowThemeSelector(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                >
                  <X size={20} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Options */}
              <div>
                {/* Theme Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Choose Theme
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {backgroundThemes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => handleThemeSelect(theme.id)}
                        className={`cursor-pointer p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                          selectedTheme === theme.id
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        <div className="text-2xl mb-1">{theme.emoji}</div>
                        <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          {theme.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Choose Size
                  </h3>
                  <div className="space-y-2">
                    {cardSizes.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => handleSizeSelect(size.id)}
                        className={`cursor-pointer w-full p-3 rounded-xl border-2 text-left transition-all hover:scale-[1.02] ${
                          selectedSize === size.id
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        <div className="font-medium text-gray-900 dark:text-white">
                          {size.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {size.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side - Preview */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Preview
                </h3>
                <div className="flex justify-center">
                  <TaleCardVariants
                    title={selectedTale.title}
                    content={selectedTale.content}
                    date={formatDate(new Date(selectedTale.timestamp))}
                    variant={selectedTheme}
                    size={selectedSize}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setShowThemeSelector(false)}
                  className="cursor-pointer px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGenerateCard}
                  className="cursor-pointer px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium transition-colors"
                >
                  Generate Card 🎨
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaleViewer;
