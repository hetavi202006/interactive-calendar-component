export default function HeroImage({ currentDate }) {
  const monthImages = [
    "https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e", // Jan
    "https://images.unsplash.com/photo-1483664852095-d6cc6870702d", // Feb
    "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa", // Mar
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946", // Apr
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e", // May
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", // Jun
    "https://images.unsplash.com/photo-1505118380757-91f5f5632de0", // Jul
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b", // Aug
    "https://images.unsplash.com/photo-1444459094717-a29f52f36f33", // Sep
    "https://images.unsplash.com/photo-1476820865390-c52aeebb9891", // Oct
    "https://images.unsplash.com/photo-1504450758481-7338eba7524a", // Nov
    "https://images.unsplash.com/photo-1483982258113-b72862e6cff6", // Dec
  ];

  return (
    <div className="h-64 md:h-auto md:w-5/12 relative overflow-hidden group">
      <img
        src={monthImages[currentDate.month()]}
        alt={`Landscape for ${currentDate.format("MMMM")}`}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
        <h1 className="text-4xl font-bold tracking-tight">{currentDate.format("YYYY")}</h1>
        <p className="text-lg font-medium opacity-90">Plan your journey.</p>
      </div>
    </div>
  );
}