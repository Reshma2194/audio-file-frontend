import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import AdminLogin from "./components/AdminLogin";
import Files from "./components/admin/Files";
import File from "./components/admin/File";
import Home from "./components/user/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Login /> }></Route>
        <Route path="/adminlogin" element={ <AdminLogin /> }></Route>
        <Route path="/admin" element={ <Files /> }></Route>
        <Route path="/admin/file/:id" element={ <File /> }></Route>
        <Route path="/user" element={ <Home /> }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
