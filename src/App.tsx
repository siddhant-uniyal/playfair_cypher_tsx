import "./styles.css";
import Text from "/src/components/Text";
import Grid from "/src/components/Grid";
import AppContextProvider from "./context/app-context";
const App = () => {
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
