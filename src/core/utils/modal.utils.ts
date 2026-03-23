export const getModalTitle = (activeModal: string | null): string => {
  switch (activeModal) {
    case "add-product":
      return "Agregar Nuevo Producto";
    case "add-customer":
      return "Agregar Nuevo Cliente";
    default:
      return "";
  }
};
