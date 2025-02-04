import React from "react";
import "./styles.css";
import Text from "./components/Text";
import Grid from "./components/Grid";
import AppContextProvider from "./context/app-context";
const App = (argument) => {
  console.log({ "AppArgument":argument})
  return (
    <div id="body" className="bg-slate-600 flex flex-col items-center ">
      <AppContextProvider>
        <Text />
        <Grid></Grid>
      </AppContextProvider>
      
    </div>
  );
};

export default App;
