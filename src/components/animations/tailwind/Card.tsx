export const Card = ({
  content,
  className,
}: {
  content: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={"glass-card" + (className ? " " + className : "")}>
      {content}
    </div>
  );
};
