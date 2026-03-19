import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { createPortal } from "react-dom";
import { EASE_SPRING } from "../../../core/utils/animations";

interface AnimatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

/**
 * AnimatedModal
 * High-performance modal with a "Spring" entrance and Backdrop blur.
 */
export const AnimatedModal = ({
  isOpen,
  onClose,
  title,
  children,
}: AnimatedModalProps): ReactNode => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isOpen) {
        // Entrance
        gsap.to(backdropRef.current, { opacity: 1, duration: 0.3 });
        gsap.fromTo(
          modalRef.current,
          { scale: 0.9, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, ease: EASE_SPRING, duration: 0.5 },
        );
      }
    },
    { dependencies: [isOpen] },
  );

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md opacity-0 transition-opacity"
      />

      {/* Modal Card */}
      <div
        ref={modalRef}
        className="glass-card relative w-full max-w-lg p-8 shadow-2xl border border-white/10 opacity-0"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold color-text">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors color-text"
          >
            ✕
          </button>
        </div>

        <div className="color-text opacity-90">{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default AnimatedModal;
