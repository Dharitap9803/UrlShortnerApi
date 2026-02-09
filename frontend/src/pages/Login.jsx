import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import googleLogo from "../assets/google.png";
import logo2 from "../assets/logo2.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth(app);

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // User is signed in
      const user = result.user;
      console.log("User signed in with Google:", user);

      // Store user token in localStorage
      const token = await user.getIdToken();
      localStorage.setItem("token", token);

      // Redirect to LinkDetail page after successful login
      navigate("/links/:id");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      alert("Failed to sign in with Google. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // User is signed in
      const user = userCredential.user;
      console.log("User signed in:", user);

      // Store user token in localStorage
      const token = await user.getIdToken();
      localStorage.setItem("token", token);

      // Redirect to LinkDetail page after successful login
      navigate("/links/:id");
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Failed to sign in. Please check your email and password.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
       <div className="py-12">
  <h1 className="text-4xl font-bold text-blue-700" style={{ fontFamily: "'Pacifico', cursive" }}>
    Shortly
  </h1>
</div>


        {/* Content */}
        <div className="flex flex-col md:flex-row">
          {/* Left Side: Login Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Log in and start sharing</h2>
            <p className="text-gray-600 mb-8">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>

            {/* Google Login Button */}
            <button
              onClick={loginWithGoogle}
              className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-3 px-4 mb-6 hover:bg-gray-50"
            >
              <img src={googleLogo} alt="Google Logo" className="w-5 h-5 mr-2"/>
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

              <div className="mb-6 text-right">
                <button
                  type="button"
                  onClick={() => navigate("/forgetpassword")}
                  className="text-blue-600 hover:underline text-sm bg-transparent border-none p-0 cursor-pointer"
                >
                  Forgot your password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Log in
              </button>
            </form>

            <p className="text-gray-500 text-sm mt-6">
              By logging in with an account, you agree to Shortly's{" "}
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

          {/* Right Side: Illustration */}
          <div className="w-full md:w-1/2 bg-gray-50 p-8 flex items-center justify-center">
            <div className="max-w-md text-center w-full">
              <img
                src={logo2}
                alt="Shortly Connections Platform"
                className="w-full h-auto object-cover"
                style={{ maxHeight: '300px' }}
              />
              <h3 className="text-xl font-bold text-gray-900 mt-6">
                Connect Shortly to the tools you use every day
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
