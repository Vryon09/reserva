import type React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type:
    | "primary"
    | "secondary"
    | "reject"
    | "confirm"
    | "neutral"
    | "neutralWhite"
    | "ellipsis"
    | "logo";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const buttonDefault =
  "disable-highlight cursor-pointer rounded-4xl uppercase tracking-wide transition-all duration-100";

const buttonTypes = {
  primary:
    buttonDefault +
    " text-sm md:text-base bg-brand-500 hover:bg-brand-600 active:bg-brand-400 px-5 py-3 font-bold text-neutral-50 ",
  secondary:
    buttonDefault +
    " text-sm md:text-base text-brand-500 hover:text-brand-600 active:text-brand-400 py-3 font-bold",
  reject:
    buttonDefault +
    " text-xs md:text-sm font-semibold px-3 py-2 bg-red-600 hover:bg-red-700 active:bg-red-500 p-2 text-white",
  confirm:
    buttonDefault +
    " text-xs md:text-sm font-semibold px-3 py-2 bg-green-500 hover:bg-green-600 active:bg-green-400 p-2 text-white",
  neutral:
    buttonDefault +
    " text-xs md:text-sm font-semibold px-3 p-2 text-white bg-gray-500 hover:bg-gray-600 active:bg-gray-400",
  neutralWhite:
    buttonDefault +
    " text-sm font-semibold px-3 p-2 bg-gray-300 hover:bg-gray-400 active:bg-gray-500",
  ellipsis: buttonDefault + " text-sm font-semibold",
  logo: "disable-highlight w-fit cursor-pointer text-3xl font-bold tracking-wider uppercase",
};

function Button({ children, type, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className={buttonTypes[type]}>
      {children}
    </button>
  );
}

export default Button;
