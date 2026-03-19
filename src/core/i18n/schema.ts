export const defaultTranslation = {
  common: {
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    loading: "Cargando",
  },
  sidebar: {
    welcome: "Bienvenido, ",
    logout: "Cerrar sesión"
  },
  roles: {
    admin: "Administrador",
    super_admin: "Invitado"
  },
  titletxt: {
    dashboard: "Este es tu panel principal"
  }
};

export type TranslationSchema = typeof defaultTranslation;