export const Stat = ({ title, value, change }: { title: string; value: string | number; change: string }) => {
  return (
    <div className="glass-card p-4 w-1/4">
      <h3 className="text-sm font-medium color-text">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      <p className={`text-sm ${change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>{change}</p>
    </div>
  );
};
