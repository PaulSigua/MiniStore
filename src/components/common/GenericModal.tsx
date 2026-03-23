import { useLayoutEffect, useRef, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  anchorRect?: DOMRect | null;
}

export const GenericModal = ({
  isOpen,
  onClose,
  children,
  title,
  anchorRect,
}: Props) => {
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isOpen && anchorRect && modalRef.current) {
      // Use offsetHeight/offsetWidth that ignore scale() and translateY() from CSS
      const actualHeight = modalRef.current.offsetHeight;
      const actualWidth = modalRef.current.offsetWidth;
      
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const margin = 20; 

      // Initial position: To the right of the clicked item, aligned at the top
      let calcTop = anchorRect.top;
      let calcLeft = anchorRect.right + 12;

      // Prevent RIGHT overflow using the actual width
      if (calcLeft + actualWidth > viewportWidth - margin) {
        calcLeft = viewportWidth - actualWidth - margin;
      }

      // Prevent BOTTOM overflow using the actual height
      if (calcTop + actualHeight > viewportHeight - margin) {
        calcTop = viewportHeight - actualHeight - margin;
      }

      // Prevent TOP overflow
      if (calcTop < margin) {
        calcTop = margin;
      }

      requestAnimationFrame(() => {
        setCoords({ top: calcTop, left: calcLeft });
      });
    } else if (!isOpen) {
      requestAnimationFrame(() => {
        setCoords(null);
      });
    }
  }, [isOpen, anchorRect]);

  if (!isOpen) return null;

  const modalStyle: React.CSSProperties = anchorRect
    ? {
        position: "absolute",
        top: coords ? `${coords.top}px` : `${anchorRect.top}px`,
        left: coords ? `${coords.left}px` : `${anchorRect.right + 12}px`,
        visibility: coords ? "visible" : "hidden", 
        margin: 0,
      }
    : {};

  return (
    <div
      className={`fixed inset-0 z-50 flex ${
        !anchorRect ? "items-center justify-center p-4" : ""
      }`}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        style={modalStyle}
        className="glass-card w-full max-w-lg h-auto max-h-[60vh] p-3 relative animate-ios-modal flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-white/20 rounded-full absolute top-3 left-1/2 -translate-x-1/2" />

        <div className="flex justify-between items-center mb-4 mt-2 h-auto shrink-0">
          <h2 className="text-xl font-bold color-text">{title}</h2>
          <button
            onClick={onClose}
            className="cursor-pointer transition-colors text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 color-text"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto custom-scrollbar pr-2">{children}</div>
      </div>
    </div>
  );
};