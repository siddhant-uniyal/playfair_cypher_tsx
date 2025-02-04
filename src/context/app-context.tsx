import { createContext, Dispatch, SetStateAction, useState } from "react";

type AppContextProviderProps = {
    children : React.ReactNode
}

type StringStateSetterType = Dispatch<SetStateAction<string>>

type AppContextType = {
  keyInput : string,
  setKeyInput : StringStateSetterType
  plInput : string,
  setPlInput : StringStateSetterType
  cipherOutput : string,
  setCipherOutput : StringStateSetterType
  bigramIndex : number,
  setBigramIndex : Dispatch<SetStateAction<number>>
}

const defaultStates = {
  keyInput : "",
  setKeyInput : (keyInput : string) => {},
  plInput : "",
  setPlInput : (plInput : string) => {},
  cipherOutput : "",
  setCipherOutput : (cipherOutput : string) => {},
  bigramIndex : -1,
  setBigramIndex : (bigramIndex : number) => {}
} as AppContextType

export const AppContext = createContext<AppContextType>(defaultStates)

const AppContextProvider = (argument : AppContextProviderProps) => {
  console.log(argument);
  const {children} = argument;
  const [keyInput, setKeyInput] = useState("");
  const [plInput, setPlInput] = useState("");
  const [cipherOutput, setCipherOutput] = useState("");
  const [bigramIndex , setBigramIndex] = useState(25);

  return (
    <AppContext.Provider
      value={{
        keyInput,
        setKeyInput,
        plInput,
        setPlInput,
        cipherOutput,
        setCipherOutput,
        bigramIndex,
        setBigramIndex,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
