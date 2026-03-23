import { APP_INFO } from "../../../core/app/info";

export const Logo = () => {
  return (
    <div className="inline-flex items-center gap-2 p-2 rounded-3xl bg-white/5 border border-white/10 mb-8 backdrop-blur-xl">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-vibrant-orange to-red-600 flex items-center justify-center text-white text-2xl font-black">
        {APP_INFO.name?.charAt(0)}
      </div>
      <h1 className="text-2xl font-bold color-text tracking-tight">
        {APP_INFO.name}
      </h1>
    </div>
  );
};
