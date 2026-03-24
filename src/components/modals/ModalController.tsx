import { AddProduct } from "../../pages/options/AddProduct";
import { AddCustomer } from "../../pages/options/AddCustomer";
import type { User } from "../../core/utils/user.auth";

interface ModalControllerProps {
  activeModal: string | null;
  user: User | null;
  onClose: () => void;
}

export const ModalController = ({
  activeModal,
  user,
  onClose,
}: ModalControllerProps) => {
  if (!activeModal) return null;

  switch (activeModal) {
    case "add-product":
      return (
        <AddProduct
          onSuccess={onClose}
          content={<p>Contenido del modal de producto</p>}
        />
      );
    case "add-customer":
      return (
        <AddCustomer
          onSuccess={onClose}
          content={<p>Contenido del modal de cliente</p>}
        />
      );
    case "user-details":
      return user ? (
        <div className="space-y-4">
          <div className="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-vibrant-orange to-red-600 flex items-center justify-center text-center text-white text-3xl font-black">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold color-text">{user.name}</h3>
              <p className="text-sm opacity-60 color-text">{user.email}</p>
            </div>
          </div>
          <div className="p-2 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-sm color-text">
              <strong>Rol:</strong> {user.role}
            </p>
          </div>
        </div>
      ) : null;
    default:
      return null;
  }
};
