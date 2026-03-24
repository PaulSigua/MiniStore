import {
  ArrowRightOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import type { SideMenuProps } from "../../../core/types/menu";

export const UserItem = ({
  content,
  onShowUserDetails,
}: {
  content: SideMenuProps["content"];
  onShowUserDetails?: (e: React.MouseEvent) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!content) return null;

  return (
    <div className="relative">
      {isOpen && (
        <div className="absolute left-0 bottom-full mb-2 w-fit glass-card ml-0 z-50 p-2 h-fit">
          <button
            onClick={(e) => {
              onShowUserDetails?.(e);
              setIsOpen(true);
            }}
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-500/10 transition-colors text-left cursor-pointer"
          >
            <UserIcon className="w-5 h-5 opacity-60" />
            <span className="font-medium color-text">Ver detalles</span>
          </button>
          <button
            onClick={() => {
              content.logout();
              setIsOpen(false);
            }}
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-500/10 transition-colors text-left text-red-500 cursor-pointer"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span className="font-medium">Cerrar sesión</span>
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center gap-3 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 w-10 h-10 hover:bg-white/10 group bg-gradient-to-br from-vibrant-orange to-red-600 cursor-pointer ${
          isOpen ? "ring-2 ring-vibrant-orange/50 bg-white/10" : ""
        }`}
      >
        <UserIcon className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};
