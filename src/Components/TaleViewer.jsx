import React, { useEffect, useState } from "react";
import { getTalesByDate, deleteTale, updateTale } from "../services/taleService";
import { formatDate } from "../utils/utils";
import { Save, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";


const TaleViewer = ({ date, onBack, user }) => {
  const [tales, setTales] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ title: "", content: "", category: "" });

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
    toast.error("Failed to delete tale." , error);
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


  return (
    <div className="lg:w-1/2 mx-auto mt-10 backdrop-blur-md bg-white/80 dark:bg-[#0e0e0e]/90 text-gray-900 dark:text-gray-100 shadow-2xl rounded-2xl border border-white/30 dark:border-white/10 p-6">
      <button onClick={onBack} className="text-blue-500 hover:underline mb-6 text-sm">
        ← Back to Calendar
      </button>

      {tales.length > 0 ? (
        tales.map((tale, index) => (
          <div
            key={tale.id}
            className="mb-8 p-6 rounded-xl bg-white/90 dark:bg-black/40 border border-gray-300 dark:border-white/10 shadow"
          >
            {editIndex === index ? (
              <>
                <label className="block text-sm font-semibold mb-1">Title</label>
                <input
                  className="w-full px-4 py-3 mb-4 rounded-xl bg-white/80 dark:bg-black/40 border border-gray-300 dark:border-white/20 placeholder-gray-500 dark:placeholder-gray-400"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Title"
                />

                <label className="block text-sm font-semibold mb-1">Category</label>
                <input
                  className="w-full px-4 py-3 mb-4 rounded-xl bg-white/80 dark:bg-black/40 border border-gray-300 dark:border-white/20 placeholder-gray-500 dark:placeholder-gray-400"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="Category"
                />

                <label className="block text-sm font-semibold mb-1">Content</label>
                <textarea
                  rows="6"
                  className="w-full px-4 py-3 mb-4 rounded-xl bg-white/80 dark:bg-black/40 border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Your Tale"
                />

                <div className="flex justify-between items-center gap-4">
                  <button
                    onClick={() => handleEditSubmit(tale.id)}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg transition duration-200"
                  >
                    <Save size={18} />
                    Save
                  </button>
                  <button
                    onClick={() => setEditIndex(null)}
                    className="px-5 py-3 rounded-xl bg-gray-500 hover:bg-gray-600 text-white font-medium transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-2xl font-bold text-black dark:text-white mb-1">
                      {tale.title}
                    </h2>
                    <p className="text-sm italic text-gray-700 dark:text-gray-300 mb-1">
                      🏷️ {tale.category}
                    </p>
                    <div className="text-xs text-gray-600 dark:text-gray-400 flex gap-4">
                      <span>📅 {formatDate(new Date(tale.timestamp))}</span>
                      <span>
                        ⏰{" "}
                        {new Date(tale.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEditClick(index)}
                      className="text-yellow-500 hover:text-yellow-400 flex items-center gap-1 text-sm"
                    >
                      <Pencil size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(tale.id)}
                      className="text-red-500 hover:text-red-400 flex items-center gap-1 text-sm"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-900 dark:text-gray-200 whitespace-pre-line">
                  {tale.content}
                </p>
              </>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-600 dark:text-gray-300 text-center">
          No tales found for this date.
        </p>
      )}
    </div>
  );
};

export default TaleViewer;
