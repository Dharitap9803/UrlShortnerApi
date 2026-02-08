import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import LinkDetails from './pages/LinkDetails';
import ForgetPassword from './pages/ForgetPassword';
import Reset from './pages/Reset';

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

    </Routes>
  );
}
