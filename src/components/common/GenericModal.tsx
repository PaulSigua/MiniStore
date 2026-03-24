import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

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
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null,
  );
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);
  const [isPositioned, setIsPositioned] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  // States to "freeze" the content and the anchorRect during the closing
  const [displayTitle, setDisplayTitle] = useState(title);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [displayAnchorRect, setDisplayAnchorRect] = useState(anchorRect);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else {
      setIsClosing(true);
    }
  }

  // Sincronice the content and anchorRect when the modal is open
  if (isOpen) {
    if (displayTitle !== title) setDisplayTitle(title);
    if (displayChildren !== children) setDisplayChildren(children);
    if (displayAnchorRect !== anchorRect) setDisplayAnchorRect(anchorRect);
  }

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 400); // Match the duration in modal.css (0.4s)
      return () => clearTimeout(timer);
    }
  }, [isClosing]);

  useLayoutEffect(() => {
    if (isOpen && displayAnchorRect && modalRef.current) {
      // Use offsetHeight/offsetWidth that ignore scale() and translateY() from CSS
      const actualHeight = modalRef.current.offsetHeight;
      const actualWidth = modalRef.current.offsetWidth;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const margin = 20;

      let calcTop = displayAnchorRect.top;
      let calcLeft = displayAnchorRect.right + 12;

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
        setIsPositioned(true);
      });
    } else if (isOpen && !displayAnchorRect) {
      requestAnimationFrame(() => {
        setIsPositioned(true);
      });
    }
  }, [isOpen, displayAnchorRect]);

  if (!shouldRender) return null;

  const modalStyle: React.CSSProperties = displayAnchorRect
    ? {
        position: "absolute",
        top: coords ? `${coords.top}px` : `${displayAnchorRect.top}px`,
        left: coords ? `${coords.left}px` : `${displayAnchorRect.right + 12}px`,
        margin: 0,
        // Try to prevent flicker before coordinates are calculated
        opacity: isPositioned ? 1 : 0,
        pointerEvents: isPositioned ? "auto" : "none",
      }
    : {};

  return (
    <div
      className={`fixed inset-0 z-50 flex ${
        !displayAnchorRect ? "items-center justify-center p-4" : ""
      } ${isClosing ? "animate-ios-overlay-out" : "animate-ios-overlay"}`}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        style={modalStyle}
        className={`glass-card w-fit max-w-lg h-auto max-h-[60vh] p-3 relative flex flex-col overflow-hidden shadow-2xl ${
          isClosing ? "animate-ios-modal-out" : "animate-ios-modal"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-white/20 rounded-full absolute top-3 left-1/2 -translate-x-1/2" />

        <div className="flex justify-between items-center mb-4 mt-2 h-auto shrink-0 gap-4">
          <h2 className="text-xl font-bold color-text">{displayTitle}</h2>
          <button
            onClick={onClose}
            className="cursor-pointer transition-colors text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 color-text"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto custom-scrollbar pr-2">
          {displayChildren}
        </div>
      </div>
    </div>
  );
};
