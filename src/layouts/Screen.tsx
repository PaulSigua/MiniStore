import { Outlet, useLocation } from "react-router-dom";
import { useUser } from "../core/hooks/user.hook";
import { useTranslation } from "../core/hooks/useTranslation";
import { SideMenu } from "../components/animations/tailwind/SideMenu";
import { AnimateWrapper } from "../components/animations/gsap/AnimateWrapper";
import {
  superAdminMenu,
  adminMenu,
  employeeMenu,
} from "../core/utils/menu-content";

export const Screen = () => {
  const location = useLocation();
  // hook
  const { user, isAdmin, isSuperAdmin } = useUser();

  const { t } = useTranslation();

  // menu selector
  const getMenu = () => {
    if (isSuperAdmin) return superAdminMenu;
    if (isAdmin) return adminMenu;
    return employeeMenu;
  };

  if (!user) return <div>{t.common.loading}</div>;

  return (
    <div className="flex color-text glass-bg">
      <SideMenu groups={getMenu()} />

      <main className="flex-1 p-8 color-text glass-bg mt-4 overflow-y-auto relative">
        <AnimateWrapper
          key={location.pathname}
          animation="slideUp"
          duration={0.7}
        >
          <Outlet />
        </AnimateWrapper>
      </main>
    </div>
  );
};
