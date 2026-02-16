import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LinkDetails from './pages/LinkDetails';
import Edit from './pages/Edit';
import Analytics from './pages/Analytics';
import ForgetPassword from './pages/ForgetPassword';
import Reset from './pages/Reset';
import Links from './pages/Links';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/link-details" element={<LinkDetails />} />
      <Route path="/link-details/:id/edit" element={<Edit />} />
      <Route path="/link-details/:id/analytics" element={<Analytics />} />
      <Route path="/link-details/:id" element={<LinkDetails />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/links" element={<Links />} />
      <Route path="/home" element={<Home />} />


    </Routes>
  );
}
