import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export default function CalendarGrid({ 
  currentDate, setCurrentDate, 
  startDate, setStartDate, 
  endDate, setEndDate 
}) {
  const today = dayjs();
  const daysInMonth = currentDate.daysInMonth();
  const startDay = currentDate.startOf("month").day();

  const datesArray = Array.from({ length: startDay }, () => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => currentDate.date(i + 1))
  );

  const handleDateClick = (clickedDayJs) => {
    if (!clickedDayJs) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDayJs);
      setEndDate(null);
    } else {
      if (clickedDayJs.isBefore(startDate, "day")) {
        setEndDate(startDate);
        setStartDate(clickedDayJs);
      } else {
        setEndDate(clickedDayJs);
      }
    }
  };

  return (
    <div>
      {/* HEADER NAVIGATION */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition text-gray-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-2xl font-extrabold text-gray-800 uppercase tracking-widest">
          {currentDate.format("MMMM")}
        </h2>
        <button
          onClick={() => setCurrentDate(currentDate.add(1, "month"))}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition text-gray-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* WEEK DAYS */}
      <div className="grid grid-cols-7 text-center mb-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>

      {/* DATES GRID */}
      <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center">
        {datesArray.map((dateObj, index) => {
          if (!dateObj) return <div key={`empty-${index}`} />;

          const isStart = startDate && dateObj.isSame(startDate, "day");
          const isEnd = endDate && dateObj.isSame(endDate, "day");
          const inRange = startDate && endDate && dateObj.isBetween(startDate, endDate, "day", "[]");
          const isToday = dateObj.isSame(today, "day");
          const isPast = dateObj.isBefore(today, "day");

          let baseClasses = "py-2 mx-1 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ";
          let stateClasses = "text-gray-700 hover:bg-gray-100";

          if (isPast && !isStart && !isEnd && !inRange) {
            stateClasses = "text-gray-300 pointer-events-none";
          } else if (isStart || isEnd) {
            stateClasses = "bg-blue-600 text-white shadow-md transform scale-105";
          } else if (inRange) {
            stateClasses = "bg-blue-100 text-blue-800 rounded-none mx-0";
          }

          return (
            <div key={index} className="flex justify-center relative">
              <div
                onClick={() => !isPast && handleDateClick(dateObj)}
                className={`${baseClasses} ${stateClasses} w-full`}
              >
                {dateObj.date()}
              </div>
              {isToday && !isStart && !isEnd && (
                 <div className="absolute bottom-0 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* SELECTION FEEDBACK */}
      <div className="mt-4 min-h-[24px]">
        {startDate && (
          <p className="text-sm font-medium text-blue-600">
            {endDate 
              ? `Selected: ${startDate.format("MMM D")} — ${endDate.format("MMM D")}`
              : `Selected: ${startDate.format("MMM D")} (Choose end date)`}
          </p>
        )}
      </div>
    </div>
  );
}