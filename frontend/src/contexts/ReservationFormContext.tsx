import { createContext, useReducer } from "react";

type ReservationFormState = {
  partySize: string;
  date: string;
  time: string;
  tableName: string;
};

type ReservationFormAction =
  | { type: "setPartySize"; payload: string }
  | { type: "setDate"; payload: string }
  | { type: "setTime"; payload: string }
  | { type: "setTable"; payload: string }
  | { type: "resetForm" };

type ReservationFormContextType = ReservationFormState & {
  dispatch: React.Dispatch<ReservationFormAction>;
};

const ReservationFormContext = createContext({} as ReservationFormContextType);

const initialState = {
  partySize: "none",
  date: "",
  time: "none",
  tableName: "",
};

function reducer(
  state: ReservationFormState,
  action: ReservationFormAction,
): ReservationFormState {
  switch (action.type) {
    case "setPartySize":
      return { ...state, partySize: action.payload };
    case "setDate":
      return { ...state, date: action.payload };
    case "setTime":
      return { ...state, time: action.payload };
    case "setTable":
      return { ...state, tableName: action.payload };
    case "resetForm":
      return {
        ...state,
        partySize: "none",
        date: "",
        time: "none",
        tableName: "",
      };
    default:
      throw new Error("Unknown Type.");
  }
}

function ReservationFormProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ReservationFormContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ReservationFormContext.Provider>
  );
}

export { ReservationFormProvider, ReservationFormContext };
