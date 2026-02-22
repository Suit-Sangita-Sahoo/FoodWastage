import { Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Dashboard from "./component/dashboard/Dashboard";
import ManageProducts from "./component/dashboard/ManageProduct";

function App() {
  return (
    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/manage" element={<ManageProducts />} />
</Routes>
    // <>
    // <Dashboard/>
    // {/* <ManageProducts/> */}
    // </>
  );
}

export default App;