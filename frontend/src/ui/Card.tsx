interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  additionalStyle?: string;
}

function Card({ children, onClick, additionalStyle = "" }: CardProps) {
  const style =
    "rounded-xl bg-neutral-50 px-4 py-4 drop-shadow-[0_0_4px_rgba(0,0,0,0.24)] " +
    additionalStyle;

  return (
    <div onClick={onClick} className={style}>
      {children}
    </div>
  );
}

export default Card;
