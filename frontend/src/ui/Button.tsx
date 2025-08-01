import type React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type:
    | "primary"
    | "secondary"
    | "reject"
    | "confirm"
    | "confirmXl"
    | "neutral"
    | "logo";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const buttonDefault =
  "disable-highlight cursor-pointer rounded-4xl uppercase tracking-wide";

const buttonTypes = {
  primary:
    buttonDefault +
    " text-sm md:text-base bg-brand-500 border-2 px-5 py-3 font-bold text-neutral-50 ",
  secondary:
    buttonDefault + " text-sm md:text-base text-brand-500 px-5 py-3 font-bold",
  reject:
    buttonDefault +
    " text-xs md:text-sm font-semibold px-3 py-2 bg-red-600 p-2 text-white",
  confirm:
    buttonDefault +
    " text-xs md:text-sm font-semibold px-3 py-2 bg-green-500 p-2 text-white",
  confirmXl:
    buttonDefault + " font-semibold px-4 py-2 bg-green-500 p-2 text-white",
  neutral:
    buttonDefault +
    " text-sm font-semibold px-3 py-2 p-2 text-white bg-gray-500",
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
