import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useUser } from "../core/hooks/user.hook";
import { useTranslation } from "../core/hooks/useTranslation";
import { SideMenu } from "../components/animations/tailwind/SideMenu";
import { GenericModal } from "../components/common/GenericModal";
import {
  superAdminMenu,
  adminMenu,
  employeeMenu,
} from "../core/routes/menu-content";
import Skeleton from "../components/animations/tailwind/Skeleton";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ModalController } from "../components/modals/ModalController";
import { getModalTitle } from "../core/utils/modal.utils";

export const Screen = () => {
  const { user, isAdmin, isSuperAdmin } = useUser();
  const { t } = useTranslation();

  // State for modal
  type ModalType = "add-product" | "add-customer" | "user-details" | null;
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  // Actions for "Add Product"
  const addProductAction = {
    title: "Añadir Producto",
    icon: PlusIcon,
    href: "",
    onClick: (e: React.MouseEvent) => {
      setActiveModal("add-product");
      setAnchorRect(e.currentTarget.getBoundingClientRect());
    },
  };

  const addCustomerAction = {
    title: "Añadir Cliente",
    icon: PlusIcon,
    href: "",
    onClick: (e: React.MouseEvent) => {
      setActiveModal("add-customer");
      setAnchorRect(e.currentTarget.getBoundingClientRect());
    },
  };

  const handleShowUserDetails = (e: React.MouseEvent) => {
    setAnchorRect(e.currentTarget.getBoundingClientRect());
    setActiveModal("user-details");
  };

  // Menu selector that injects the actions according to the role
  const getMenuGroups = () => {
    const baseMenu = isSuperAdmin
      ? [...superAdminMenu]
      : isAdmin
        ? [...adminMenu]
        : [...employeeMenu];

    if (isSuperAdmin) {
      return [
        ...baseMenu,
        {
          title: "Acciones rápidas",
          items: [addProductAction, addCustomerAction],
        },
      ];
    }
    return baseMenu;
  };

  if (!user) return <div>{t.common.loading}</div>;

  return (
    <div className="flex h-screen overflow-hidden color-text glass-bg p-4">
      {/* Lateral Menu */}
      <SideMenu
        groups={getMenuGroups()}
        activeModal={activeModal}
        onShowUserDetails={handleShowUserDetails}
        content={{ title: user.name, user: user, logout: () => {} }}
      />

      {/* Main Content */}
      <main className="flex-1 glass-card overflow-y-auto relative shadow-lg p-8">
        <Skeleton className="w-full h-full" variant="text">
          <Outlet />
        </Skeleton>
      </main>

      {/* Modal */}
      <GenericModal
        isOpen={!!activeModal}
        onClose={() => {
          setActiveModal(null);
          setAnchorRect(null);
        }}
        title={getModalTitle(activeModal)}
        anchorRect={anchorRect}
      >
        <ModalController
          activeModal={activeModal}
          user={user}
          onClose={() => setActiveModal(null)}
        />
      </GenericModal>
    </div>
  );
};
