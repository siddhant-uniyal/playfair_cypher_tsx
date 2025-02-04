import { useContext } from "react";
import { AppContext } from "../context/app-context";

export default function useAppContext() {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error("useAppContext() hook cannot be used by a component not wrapped in the AppContextProvider component")
    }
    return context;
}
