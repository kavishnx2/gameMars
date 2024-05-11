import { useState, useEffect } from "react";

export function IslandMapCursor({ isHovered }: { isHovered: boolean }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updatePosition);

    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  // Inline styles for the cursor element, including scaling
  const cursorStyles = {
    top: position.y,
    left: position.x,
    transform: isHovered ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0)",
  };

  return (
    <div
      className="pointer-events-none fixed z-60 grid size-104 place-items-center rounded-full border-4 border-purple-500/20 bg-purpleLight-500/40 backdrop-blur-sm transition-transform xl:hidden"
      style={cursorStyles}
    >
      <p className="font-semibold uppercase text-white">Explore</p>
    </div>
  );
}
