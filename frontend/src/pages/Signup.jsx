import { useState } from "react";
import { useNavigate } from "react-router-dom";
import googleLogo from "../assets/google.png";
import logo from "../assets/logo.png";


export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-12">
          <div className="flex items-center">
            <h1 className="text-4xl font-bold text-orange-500">Shortly.</h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row">
          {/* Left Side: Signup Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
            <p className="text-gray-600 mb-8">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Log in
              </a>{" "}
              or{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Log in with SSO
              </a>
            </p>

            {/* Google Signup Button */}
         <button className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-3 px-4 mb-6 hover:bg-gray-50">
         <img  src={googleLogo} alt="Google Logo" className="w-5 h-5 mr-2"/>
         <span className="text-gray-700">Continue with Google</span>
          </button>


            <div className="flex items-center mb-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Email and Password Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create free account
              </button>
            </form>

            <p className="text-gray-500 text-sm mt-6">
              By creating an account, you agree to Bitly's{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>
              ,{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              , and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Acceptable Use Policy
              </a>
              .
            </p>
          </div>

         
          <div className="w-full md:w-1/2 bg-gray-50 p-8 flex items-center justify-center">
         <div className="max-w-md">
         <img  src={logo}  alt="Connections Platform"  className="w-full" />
         <h3 className="text-xl font-bold text-gray-900 mt-6">
         Power your links, QR Codes, and landing pages with the Connections Platform
    </h3>
  </div>
</div>

        </div>
      </div>
    </div>
  );
}
