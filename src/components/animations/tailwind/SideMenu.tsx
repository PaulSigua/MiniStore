import type { SideMenuProps, MenuItem } from "../../../core/types/menu";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Icon } from "../../Icons/Icon";

const SideMenuItem = ({ item }: { item: MenuItem }) => {
  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren) {
    return (
      <>
        {item.children?.map((child) => (
          <SideMenuItem key={child.title} item={child} />
        ))}
      </>
    );
  }

  return (
    <li className="list-none w-full">
      <Link
        to={item.href || "#"}
        className="menu-item flex items-center gap-3 px-4 py-2"
      >
        {item.icon && (
          <Icon icon={item.icon} className="w-5 h-5 flex-shrink-0" />
        )}
        <span className="flex-1 font-medium">{item.title}</span>
      </Link>
    </li>
  );
};

export const SideMenu = ({ groups }: SideMenuProps) => {
  return (
    <div className="glass-card flex flex-col h-full w-64 p-4">
      <Logo />
      <nav className="flex-1 overflow-y-auto space-y-8">
        {groups.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-3">
            {group.title && (
              <h3 className="px-4 text-[11px] font-bold uppercase tracking-[0.2em] text-color">
                {group.title}
              </h3>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => (
                <SideMenuItem key={item.title} item={item} />
              ))}
            </ul>

            {groupIndex < groups.length - 1 &&
              !groups[groupIndex + 1].title && (
                <div className="h-[1px] bg-white/5 mx-4 mt-6" />
              )}
          </div>
        ))}
      </nav>
    </div>
  );
};
