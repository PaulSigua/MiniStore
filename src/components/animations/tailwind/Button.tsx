export const Button = ({ text, type = "button", onClick }: { text: string, type?: "button" | "submit" | "reset", onClick?: () => void }) => {
  return <button className="btn-primary" type={type} onClick={onClick}>{text}</button>;
};

export default Button;
