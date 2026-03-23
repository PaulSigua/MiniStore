export const Button = ({ text, onClick }: { text: string, onClick?: () => void }) => {
  return <button className="btn-primary" onClick={onClick}>{text}</button>;
};

export default Button;
