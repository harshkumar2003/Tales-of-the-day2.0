import {
  ChevronDown,
  Lightbulb,
  Mic,
  Save,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import VoiceNote from "./VoiceNote";
import { useUser } from "../context/UserContext";
import { saveEncryptedTale } from "../services/taleService";
import toast from "react-hot-toast";

const categories = [
  "All categories",
  "Gratitude",
  "Reflection",
  "Emotions",
  "Experiences",
  "Dreams",
  "Wisdom",
  "Nature",
  "Relationships",
];

function TaleInput() {
  const [selected, setSelected] = useState("All categories");
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const [showVoiceNote, setShowVoiceNote] = useState(false);

  const dropdownRef = useRef(null);

  const { user } = useUser();


  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // 🧠 When transcription is complete
  const handleVoiceTranscription = (txt) => {
    setContent((prev) => prev + (prev ? " " : "") + txt);
    setShowVoiceNote(false); // Hide recorder after use
  };

  // 🎙️ Optional: Save blob somewhere later
  const handleAudioSave = (blob, dur) => {
    toast.success("Audio saved:", { dur, size: blob.size });
  };

  const handleSave = async () => {
  try {
    if (!user) return alert("Login required");

    await saveEncryptedTale(user.uid, {
      title,
      category: selected,
      content,
    });

    toast.success("Tale saved securely ✨");

    // Optional: Reset form
    setTitle("");
    setContent("");
    setSelected("All categories");

  } catch (err) {
    toast.error("Error saving tale:", err.message);
    // alert("Error saving tale. Check console.");
  }
};

  return (
    <div className="lg:w-1/2 mx-auto mt-10 backdrop-blur-md bg-white/80 dark:bg-[#0e0e0e]/90 text-gray-900 dark:text-gray-100 shadow-2xl rounded-2xl border border-white/30 dark:border-white/10">
      <div className="flex flex-col p-4">
        <div className="text-center mb-4">
          <div className="flex space-x-3 justify-center mb-4">
            <Sparkles className="text-purple-600" />
            <h1 className="text-black dark:text-white">Write Your Tale</h1>
          </div>
          <p className="text-black dark:text-white">
            Capture this moment, express your thoughts, and let your story unfold
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setShowVoiceNote((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200"
          >
            <Mic size={18} /> Voice Note
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold rounded-xl shadow-md transition-all duration-200">
            <Lightbulb size={18} /> Inspire Me
          </button>
        </div>

        {/* Voice Note Recorder */}
        {showVoiceNote && (
          <div className="mt-4">
            <VoiceNote
              onTranscription={handleVoiceTranscription}
              onAudioSave={handleAudioSave}
            />
          </div>
        )}
      </div>

      {/* Title + Category */}
      <div className="mt-4 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-lg font-semibold mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your tale a meaningful title..."
              className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-black/40 border border-gray-300 dark:border-white/20 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-500"
            />
          </div>

          {/* Category */}
          <div className="relative flex-1" ref={dropdownRef}>
            <label className="block text-lg font-semibold mb-2">
              Inspiration Category
            </label>
            <button
              onClick={() => setOpen(!open)}
              className="w-full flex justify-between items-center px-4 py-3 rounded-md bg-white/80 dark:bg-black/40 text-black dark:text-white border border-gray-300 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-500"
            >
              {selected}
              <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
              <ul className="absolute z-50 w-full mt-2 max-h-60 overflow-y-auto bg-white dark:bg-black text-gray-900 dark:text-gray-100 rounded-md border border-gray-300 dark:border-white/20 no-scrollbar">
                {categories.map((cat) => (
                  <li
                    key={cat}
                    onClick={() => {
                      setSelected(cat);
                      setOpen(false);
                    }}
                    className={`px-4 py-2 cursor-pointer flex items-center space-x-2 rounded-md transition-colors duration-150 ${
                      selected === cat
                        ? "bg-blue-100 dark:bg-white/10 font-semibold text-blue-700 dark:text-blue-400"
                        : "text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
                    }`}
                  >
                    {selected === cat && <span className="text-blue-700 dark:text-blue-400">✔</span>}
                    <span>{cat}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Tale Text Area */}
      <div className="mt-4 p-4">
        <label className="block text-lg font-semibold mb-2 text-black dark:text-white">
          Your Tale
        </label>
        <textarea
          rows={6}
          placeholder="Share your thoughts, reflections, or story... Let your words flow freely."
          className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-black/40 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-500 resize-none transition duration-200"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* Footer */}
      <div className="mt-4 px-4 py-2 flex items-center justify-between gap-4">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {content.length} characters
        </p>
        <button onClick={handleSave}
          type="submit"
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg transition duration-200"
        >
          <Save className="w-5 h-5" />
          Save Tale
        </button>
      </div>
    </div>
  );
}

export default TaleInput;
