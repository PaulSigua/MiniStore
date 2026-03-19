import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./core/context/UserContext";
import { routesConfig } from "./core/routes/routes.config";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { APP_ROUTES } from "./core/services/app-routes";
import { Screen } from "./layouts/Screen";

function App() {
  const privateRoutes = routesConfig.filter((r) => r.isPrivate);
  const publicRoutes = routesConfig.filter((r) => !r.isPrivate);

  return (
    <UserProvider>
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        {/* Private Routes Wrapped in Screen Layout */}
        <Route element={<Screen />}>
          {privateRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute allowedRoles={route.allowedRoles}>
                  {route.element}
                </ProtectedRoute>
              }
            />
          ))}
        </Route>

        {/* Redirects & 404 */}
        <Route path="/" element={<Navigate to={APP_ROUTES.LOGIN} replace />} />
        <Route
          path="*"
          element={
            <div className="flex h-screen items-center justify-center color-text font-bold">
              404 - Página no encontrada
            </div>
          }
        />
      </Routes>
    </UserProvider>
  );
}

export default App;
