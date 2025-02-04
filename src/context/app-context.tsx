import { createContext, useState } from "react";

export const AppContext = createContext(null);

type AppContextProviderProps = {
    children : React.ReactNode
}
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
