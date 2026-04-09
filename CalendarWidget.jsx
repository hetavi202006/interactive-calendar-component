import { useState, useEffect } from "react";
import dayjs from "dayjs";
import HeroImage from "./HeroImage";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";

export default function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [note, setNote] = useState("");

  // Load Note tied to the specific month
  const noteStorageKey = `calendar-note-${currentDate.format("YYYY-MM")}`;
  
  useEffect(() => {
    const saved = localStorage.getItem(noteStorageKey);
    setNote(saved || "");
  }, [currentDate, noteStorageKey]);

  // Save Note automatically when it changes
  useEffect(() => {
    localStorage.setItem(noteStorageKey, note);
  }, [note, noteStorageKey]);

  return (
    <div className="flex items-center justify-center font-sans h-full">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden transition-all duration-300">
        <div className="flex flex-col md:flex-row">
          
          <HeroImage currentDate={currentDate} />

          <div className="p-8 md:w-7/12 flex flex-col justify-between">
            <CalendarGrid 
              currentDate={currentDate} 
              setCurrentDate={setCurrentDate}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />

            <NotesPanel 
              currentDate={currentDate} 
              note={note} 
              setNote={setNote} 
            />
          </div>

        </div>
      </div>
    </div>
  );
}