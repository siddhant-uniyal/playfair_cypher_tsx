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
  setBigramIndex : Dispatch<SetStateAction<number>>,
  opMode : number,
  setOpMode : Dispatch<SetStateAction<number>>
}

const defaultStates = {
  keyInput : "",
  setKeyInput : (keyInput : string) => {},
  plInput : "",
  setPlInput : (plInput : string) => {},
  cipherOutput : "",
  setCipherOutput : (cipherOutput : string) => {},
  bigramIndex : -1,
  setBigramIndex : (bigramIndex : number) => {},
  opMode : 0,
  setOpMode : (opMode : number) => {}
} as AppContextType

export const AppContext = createContext<AppContextType>(defaultStates)

const AppContextProvider = (argument : AppContextProviderProps) => {
  console.log(argument);
  const {children} = argument;
  const [keyInput, setKeyInput] = useState("");
  const [plInput, setPlInput] = useState("");
  const [cipherOutput, setCipherOutput] = useState("");
  const [bigramIndex , setBigramIndex] = useState(25);
  const [opMode , setOpMode] = useState(0);

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
        opMode,
        setOpMode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
