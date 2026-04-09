export default function NotesPanel({ currentDate, note, setNote }) {
  return (
    <div className="mt-6 border-t pt-6">
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
        Notes for {currentDate.format("MMMM")}
      </label>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Jot down memos, events, or tasks (e.g., finalize presentation for TechExpo)..."
        className="w-full bg-gray-50 border-0 rounded-xl p-4 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none h-24"
      />
    </div>
  );
}