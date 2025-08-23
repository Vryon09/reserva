interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  additionalStyle?: string;
}

function Card({ children, onClick, additionalStyle = "" }: CardProps) {
  const style =
    "rounded-2xl bg-neutral-50 px-4 py-3 drop-shadow-[0_3px_8px_rgba(0,0,0,0.24)] " +
    additionalStyle;

  return (
    <div onClick={onClick} className={style}>
      {children}
    </div>
  );
}

export default Card;
