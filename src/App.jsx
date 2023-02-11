import { Routes, Route } from "react-router-dom";
import Company from "./companents/Company/company";
import Complex from "./companents/Complex/complex";
import Navbar from "./companents/Navbar/Navbar";
import Bank from "./companents/Bank/bank";
import Room from "./companents/Rooms/room";
import Login from "./companents/Login/login";
import User from "./companents/User/user";
import { useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();
  // const token = window.localStorage.getItem('token')

  return (


    <div className="App">


      {
        pathname == '/login' || '/' ? (
          ""
        ) : (
          <Navbar />
        )
      }


      {pathname == "/" ? (
        <User />
      ) : (
        // <div>
          
          <Routes>
            <Route path="/company" element={<Company />} />
            <Route path="/complex" element={<Complex />} />
            <Route path="/bank" element={<Bank />} />
            <Route path="/room" element={<Room />} />
            <Route path="/login" element={<Login />} />
            <Route path='/' element={<User />}/>
          </Routes>
        // </div>
      )}


    {/* {
        pathname == '/' ? (
          ""
        ) : (
          <Navbar />
        )
      } */}
    </div>
  );
}

export default App;
