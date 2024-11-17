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
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval]);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.type === "touchstart" ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX);
    setIsDragging(true);
  };

  const handleDragEnd = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const endX = e.type === "touchend" ? (e as React.TouchEvent).changedTouches[0].clientX : (e as React.MouseEvent).clientX;
    const distance = endX - startX;

    if (Math.abs(distance) > 50) {
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
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
      onMouseLeave={() => isDragging && handleDragEnd}
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
              width: '1000px',
              borderRadius: '15px',
              border : "2px solid #28343E",
              pointerEvents: isDragging ? 'none' : 'auto',
            }}
          />
        ))}
      </div>

      {slides.length > 1 && (
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button
            onClick={prev}
            className="flex items-center justify-center w-8 h-8 transform -translate-x-2 rounded-full bg-white/20 border border-white/70 shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          >
            <LeftOutlined 
              className="text-white text-xs" 
            />
          </button>
          <button
            onClick={next}
            className="flex items-center justify-center w-8 h-8 transform translate-x-2 rounded-full bg-white/20 border border-white/70 shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          >
            <RightOutlined 
              className="text-white text-xs" 
            />
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
