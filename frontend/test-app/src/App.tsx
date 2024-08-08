import React from "react";
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import NikhilForm from "./Componets/NikhilForm";
import Login from "./Componets/Login";

const App :React.FC=()=>{
 return(
    <>
    {/* <h1>nik</h1> */}
    <Router>
        <Routes>
            <Route path="/" element={<NikhilForm/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
        </Routes>
    </Router>
    </>
 )
}

export default App;