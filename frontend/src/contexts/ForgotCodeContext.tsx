import { createContext, useReducer, type ReactNode } from "react";

type StateTypes = {
  name: string;
  email: string;
  date: string;
};

type ActionTypes =
  | { type: "setName"; payload: string }
  | { type: "setEmail"; payload: string }
  | { type: "setDate"; payload: string }
  | { type: "resetForm" };

type ForgotCodeType = StateTypes & {
  dispatch: React.Dispatch<ActionTypes>;
};

const ForgotCodeContext = createContext({} as ForgotCodeType);

const initialState = {
  name: "",
  email: "",
  date: "",
};

function reducer(state: StateTypes, action: ActionTypes) {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.payload };
    case "setEmail":
      return { ...state, email: action.payload };
    case "setDate":
      return { ...state, date: action.payload };
    case "resetForm":
      return initialState;
  }
}

function ForgotCodeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ForgotCodeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ForgotCodeContext.Provider>
  );
}

export { ForgotCodeProvider, ForgotCodeContext };
