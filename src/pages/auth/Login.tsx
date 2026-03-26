import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/animations/tailwind/Card";
import type { UserLogin } from "../../core/types/auth";
import { useUser } from "../../core/hooks/user.hook";
import { APP_ROUTES } from "../../core/services/app-routes";
import { LoadingSpinner } from "../../components/animations/tailwind/LoadingSpinner";

interface LoginFormProps {
  onSubmit: (data: UserLogin) => Promise<void>;
  isLoading: boolean;
}

const LoginForm = ({ onSubmit, isLoading }: LoginFormProps): ReactNode => {
  const [credentials, setCredentials] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoading) {
      onSubmit(credentials);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-xs font-semibold color-text uppercase tracking-widest opacity-70"
        >
          Email Institucional
        </label>
        <input
          id="email"
          type="email"
          placeholder="admin@ministore.com"
          className="w-full bg-white/20 border border-white/10 rounded-2xl p-4 color-text focus:outline-none focus:ring-2 focus:ring-vibrant-orange/30 transition-all duration-300 placeholder:opacity-70"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-xs font-semibold color-text uppercase tracking-widest opacity-70"
        >
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          className="w-full bg-white/20 border border-white/10 rounded-2xl p-4 color-text focus:outline-none focus:ring-2 focus:ring-vibrant-orange/30 transition-all duration-300 placeholder:opacity-70"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`btn-primary w-full shadow-2xl shadow-vibrant-orange/20 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" />
              Ingresando...
            </>
          ) : (
            "Iniciar Sesión"
          )}
        </span>
      </button>
    </form>
  );
};

export const Login = (): ReactNode => {
  const { login, user } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if the user is already authenticated
  useEffect(() => {
    if (user) {
      navigate(APP_ROUTES.HOME, { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (data: UserLogin) => {
    setIsLoading(true);
    setError(null);
    try {
      await login(data);
      // Navigation will happen automatically through the useEffect when the 'user' changes
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Credenciales incorrectas. Inténtalo de nuevo.";
      setError(errorMessage);
      console.error("Error al iniciar sesión", err);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden font-inter">
      {/* Columna Izquierda: Branding Hero */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-12 relative overflow-hidden bg-slate-950">
        {/* Luces Ambientales de Fondo */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-vibrant-orange/20 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-apple-blue/10 rounded-full blur-[140px]" />

        <div className="max-w-md relative z-10">
          <div className="inline-block p-4 rounded-3xl bg-white/5 border border-white/10 mb-8 backdrop-blur-xl shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-vibrant-orange to-red-600 flex items-center justify-center color-text text-3xl font-black shadow-lg">
              M
            </div>
          </div>
          <h1 className="text-7xl font-black color-text mb-6 tracking-tight leading-none">
            Mini<span className="text-vibrant-orange italic">Store</span>
          </h1>
          <p className="text-xl color-text leading-relaxed font-light">
            Gestiona tu tienda con la elegancia y simplicidad que te mereces.
            <span className="block mt-4 text-sm font-medium uppercase tracking-[0.2em] text-vibrant-orange/60">
              Professional Retail Management
            </span>
          </p>
        </div>
      </div>

      {/* Right Column: Auth Container */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-3xl relative border-l border-white/5">
        <div className="w-full max-w-md relative">
          {/* Logo Mobile */}
          <div className="text-center mb-12 lg:hidden">
            <h1 className="text-4xl font-black color-text tracking-tight">
              Mini<span className="text-vibrant-orange">Store</span>
            </h1>
          </div>

          {/* Form wrapped in the system Card */}
          <Card
            className="p-10 border-white/10"
            content={
              <div className="space-y-10">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold color-text tracking-tight">
                    Bienvenido
                  </h2>
                  <p className="color-text text-sm font-light">
                    Portal de acceso para administradores y staff
                  </p>
                </div>

                {error && (
                  <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium animate-shake flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    {error}
                  </div>
                )}

                <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />

                <div className="flex flex-col items-center gap-6 pt-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <p className="color-text text-[10px] uppercase tracking-[0.3em] font-bold">
                    &copy; 2026 MiniStore Ecosystem
                  </p>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};
