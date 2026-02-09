import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import LinkDetails from './pages/LinkDetails';
import ForgetPassword from './pages/ForgetPassword';
import Reset from './pages/Reset';
import {getDatabase} from "firebase/database";
import { app } from "./firebase";
import Links from './pages/Links';



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/links/:id" element={<LinkDetails />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/links" element={<Links />} />
      <Route path="/home" element={<Home />} />


    </Routes>
  );
}
