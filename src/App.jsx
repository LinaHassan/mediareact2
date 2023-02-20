import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component /Login";
import Albums from "./component /Albums";
import Photos from "./component /Photos";
import PrivateRoutes from "./PrivateRoutes";
import UserContext from "./useContext/UserContext";
import { useState } from "react"; 
import axios from "axios";
function App() {
  const [value, setValue] = useState(JSON.parse(localStorage.getItem("user")));
  axios.defaults.baseURL="https://jsonplaceholder.typicode.com/"
  return (
    <div className="App">
    
      <UserContext.Provider value={{ value, setValue }}>
      <Routes>
        <Route element={<PrivateRoutes  />}>
          <Route path="/Albums" element={<Albums />} />
          <Route path="/Photos/:id" element={<Photos />} />
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
