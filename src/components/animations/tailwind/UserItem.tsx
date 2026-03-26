import { useRef, useEffect, useState } from "react";
import {
  ArrowRightOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useUser } from "../../../core/hooks/user.hook";
import type { SideMenuProps } from "../../../core/types/menu";

export const UserItem = ({
  content,
  onShowUserDetails,
}: {
  content: SideMenuProps["content"];
  onShowUserDetails?: (e: React.MouseEvent) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { logout } = useUser();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Don't close if clicking inside the menu OR inside a modal
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        !target.closest('[data-modal="true"]')
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!content) return null;

  return (
    <div className="relative" ref={menuRef}>
      {isOpen && (
        <div className="absolute left-0 bottom-full mb-2 w-max glass-card ml-0 z-50 p-2 h-fit min-w-[180px] animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={(e) => {
              onShowUserDetails?.(e);
              setIsOpen(false);
            }}
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/10 transition-colors text-left cursor-pointer group"
          >
            <UserIcon className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
            <span className="font-medium color-text">Ver detalles</span>
          </button>

          <div className="h-[1px] bg-white/5 my-2 mx-2" />

          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-500/10 transition-colors text-left text-red-500 cursor-pointer group"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Cerrar sesión</span>
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center gap-3 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 w-10 h-10 hover:bg-white/10 group bg-gradient-to-br from-vibrant-orange to-red-600 cursor-pointer shadow-lg shadow-vibrant-orange/20 ${
          isOpen
            ? "ring-2 ring-vibrant-orange/50 bg-white/10 scale-95"
            : "hover:scale-105"
        }`}
      >
        <UserIcon className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};
