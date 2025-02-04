import "./styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Playfair from "./pages/Playfair";
const App = () => {
  return (

    <div id="body" className="bg-slate-600 flex flex-col items-center ">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Playfair></Playfair>}></Route>
        {/* <Route path="/railfence" element={<Railfence></Railfence>}></Route> */}
      </Routes>
        </BrowserRouter>
    </div>
  );
};

export default App;
