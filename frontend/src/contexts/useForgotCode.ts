import { useContext } from "react";
import { ForgotCodeContext } from "./ForgotCodeContext";

export function useForgotCode() {
  const context = useContext(ForgotCodeContext);
  if (context === undefined)
    throw new Error("ForgotCodeContext is used outside the ItemsProvider.");
  return context;
}
