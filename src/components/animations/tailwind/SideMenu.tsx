import type { SideMenuProps, MenuItem } from "../../../core/types/menu";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { Icon } from "../../Icons/Icon";
import { UserItem } from "./UserItem";

const SideMenuItem = ({
  item,
  activeModal,
}: {
  item: MenuItem;
  activeModal?: string | null;
}) => {
  const location = useLocation();
  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren) {
    return (
      <>
        {item.children?.map((child) => (
          <SideMenuItem
            key={child.title}
            item={child}
            activeModal={activeModal}
          />
        ))}
      </>
    );
  }

  // Detect active state: matches current path OR matches active modal id/title
  const isRouteActive = item.href !== "" && location.pathname === item.href;
  const isModalActive =
    !!activeModal &&
    item.title.toLowerCase().replace(/\s+/g, "-") === activeModal;
  const isActive = isRouteActive || isModalActive;

  // Active items get the active background and text color from variables.
  // Inactive items get a subtle hover effect.
  const itemClasses = `menu-item flex items-center gap-3 px-4 py-2 w-full text-left transition-all duration-300 rounded-lg ${
    isActive
      ? "bg-menu-active-bg shadow-lg ring-1 ring-white/10"
      : "hover:bg-menu-hover-bg hover:text-menu-hover-text"
  }`;

  const contentColorClass = isActive ? "text-menu-active-text" : "color-text";

  return (
    <li className="list-none w-full">
      {item.onClick ? (
        <button onClick={(e) => item.onClick?.(e)} className={itemClasses}>
          {item.icon && (
            <Icon
              icon={item.icon}
              className={`w-5 h-5 flex-shrink-0 ${contentColorClass}`}
            />
          )}
          <span
            className={`flex-1 font-medium truncate ${contentColorClass} ${isActive ? "font-bold" : ""}`}
          >
            {item.title}
          </span>
        </button>
      ) : (
        <Link to={item.href || "#"} className={itemClasses}>
          {item.icon && (
            <Icon
              icon={item.icon}
              className={`w-5 h-5 flex-shrink-0 ${contentColorClass}`}
            />
          )}
          <span
            className={`flex-1 font-medium truncate ${contentColorClass} ${isActive ? "font-bold" : ""}`}
          >
            {item.title}
          </span>
        </Link>
      )}
    </li>
  );
};

export const SideMenu = ({
  groups,
  activeModal,
  onShowUserDetails,
  content,
}: SideMenuProps) => {
  return (
    <div className="glass-card flex flex-col h-full w-64 p-4 pb-6 gap-4 overflow-hidden justify-between">
      <div className="flex flex-col gap-4">
        <Logo />
        <nav className="min-h-0 overflow-y-auto pr-2 -mr-2 custom-scrollbar">
          <div className="flex flex-col gap-8 mt-4">
            {groups.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-3">
                {group.title && (
                  <h3 className="px-4 text-[11px] font-bold uppercase tracking-[0.2em] color-text opacity-50">
                    {group.title}
                  </h3>
                )}
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <SideMenuItem
                      key={item.title}
                      item={item}
                      activeModal={activeModal}
                    />
                  ))}
                </ul>

                {groupIndex < groups.length - 1 &&
                  !groups[groupIndex + 1].title && (
                    <div className="h-[1px] bg-black/5 mx-4 mt-6 opacity-10" />
                  )}
              </div>
            ))}
          </div>
        </nav>
      </div>
      <div className="pt-2 border-t border-white/5">
        <UserItem content={content} onShowUserDetails={onShowUserDetails} />
      </div>
    </div>
  );
};
