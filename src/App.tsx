import "./styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Playfair from "./pages/Playfair";
import Railfence from "./pages/Railfence";
import Layout from "./pages/Layout";
const App = () => {
  return (

    <div id="body" className="bg-slate-600 flex flex-col items-center relative h-screen">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route path="" element={<Playfair></Playfair>}></Route>
          <Route path="railfence" element={<Railfence></Railfence>}></Route>
        </Route>
      </Routes>
        </BrowserRouter>
    </div>
  );
};

export default App;
