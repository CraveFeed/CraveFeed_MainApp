import { useState, useEffect } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export default function Carousel({
  autoSlide = false,
  autoSlideInterval = 3000,
  slides,
}: {
  autoSlide?: boolean;
  autoSlideInterval?: number;
  slides: string[];
}) {
  const [curr, setCurr] = useState(0);
  const [startX, setStartX] = useState(0); // Track the starting X position of drag
  const [isDragging, setIsDragging] = useState(false); // Track if dragging is active

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  // Auto-slide functionality
  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval]);

  // Handle drag start
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.type === "touchstart" ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX);
    setIsDragging(true);
  };

  // Handle drag end
  const handleDragEnd = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const endX = e.type === "touchend" ? (e as React.TouchEvent).changedTouches[0].clientX : (e as React.MouseEvent).clientX;
    const distance = endX - startX;

    if (Math.abs(distance) > 50) { // Adjust threshold as needed
      if (distance > 0) {
        prev();
      } else {
        next();
      }
    }

    setIsDragging(false);
  };

  return (
    <div
      className="overflow-hidden relative"
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onTouchStart={handleDragStart} // Handle touch start
      onTouchEnd={handleDragEnd} // Handle touch end
      onMouseLeave={() => isDragging && handleDragEnd} // Handle mouse leave for dragging
    >
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            style={{
              width: '100%',
              objectFit: 'contain',
              borderRadius: '15px',
              pointerEvents: isDragging ? 'none' : 'auto', // Disable pointer events while dragging
            }}
          />
        ))}
      </div>

      {/* Show buttons only if there are multiple slides */}
      {slides.length > 1 && (
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={prev}
            className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
          >
            <LeftOutlined size={40} />
          </button>
          <button
            onClick={next}
            className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
          >
            <RightOutlined size={40} />
          </button>
        </div>
      )}

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`transition-all w-1 h-1 bg-white rounded-full ${
                curr === i ? "p-1" : "bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
