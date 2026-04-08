export const Chart = ({ title, content }: { title?: string; content: React.ReactNode }) => {
  return (
    <div className="glass-card p-4 w-full">
      <h3 className="text-sm font-medium color-text">{title}</h3>
      <div className="w-full h-48 bg-gray-200 rounded mt-4 flex items-center justify-center">{content}</div>
    </div>
  );
};
