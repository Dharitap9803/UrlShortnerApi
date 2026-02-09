import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import googleLogo from "../assets/google.png";
import logo from "../assets/logo.png";
import eyeOpen from "../assets/eyeopen.png"; // Add this icon to your assets
import eyeClosed from "../assets/eyeclosed.png"; // Add this icon to your assets

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    hasLetter: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasMinLength: false,
    emailEmpty: false,
    passwordEmpty: false
  });
  const [showErrors, setShowErrors] = useState(false);
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(app);

  const validatePassword = (pwd) => {
    const hasLetter = /[a-zA-Z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    const hasMinLength = pwd.length >= 9;

    setErrors(prev => ({
      ...prev,
      hasLetter,
      hasNumber,
      hasSpecialChar,
      hasMinLength,
      passwordEmpty: pwd.length === 0
    }));

    return hasLetter && hasNumber && hasSpecialChar && hasMinLength;
  };

  const validateEmail = (email) => {
    setErrors(prev => ({
      ...prev,
      emailEmpty: email.length === 0
    }));

    return email.length > 0;
  };

  const validateForm = () => {
    const isEmailEmpty = email.length === 0;
    const isPasswordEmpty = password.length === 0;

    setErrors(prev => ({
      ...prev,
      emailEmpty: isEmailEmpty,
      passwordEmpty: isPasswordEmpty
    }));

    setTouched(true);
    setShowErrors(true);

    return !(isEmailEmpty || isPasswordEmpty);
  };

  const signupWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed up with Google:", user);
      navigate("/");
    } catch (error) {
      console.error("Error signing up with Google:", error);
      alert("Failed to sign up with Google. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const isPasswordValid = validatePassword(password);
    if (!isPasswordValid && password.length > 0) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed up:", user);
      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Failed to sign up. Please check your email and password.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              <Link to="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>{" "}
              or{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Log in with SSO
              </a>
            </p>

            {/* Google Signup Button */}
            <button
              onClick={signupWithGoogle}
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
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 border ${touched && errors.emailEmpty ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
                {touched && errors.emailEmpty && (
                  <p className="text-red-500 text-xs mt-1">Please enter your email address</p>
                )}
              </div>

              <div className="mb-2 relative">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (touched) validatePassword(e.target.value);
                    }}
                    className={`w-full px-4 py-3 border ${touched && errors.passwordEmpty ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center bg-blue-50 hover:bg-blue-100 rounded px-2 py-1 border border-blue-200"
                    style={{ minHeight: '32px', minWidth: '60px' }}
                  >
                    {showPassword ? (
                      <>
                        <img src={eyeOpen} alt="Hide" className="w-4 h-4 mr-1" />
                        <span className="text-xs text-blue-600">Show</span>
                      </>
                    ) : (
                      <>
                        <img src={eyeClosed} alt="Show" className="w-4 h-4 mr-1" />
                        <span className="text-xs text-blue-600">Hide</span>
                      </>
                    )}
                  </button>
                </div>
                {touched && errors.passwordEmpty && (
                  <p className="text-red-500 text-xs mt-1">Please fill in this field.</p>
                )}
                {touched && !errors.passwordEmpty && password.length > 0 && (
                  <div className="mt-2">
                    <p className={`text-xs ${errors.hasLetter ? 'text-green-500' : 'text-red-500'}`}>
                      {errors.hasLetter ? '✓' : '✗'} One letter
                    </p>
                    <p className={`text-xs ${errors.hasNumber ? 'text-green-500' : 'text-red-500'}`}>
                      {errors.hasNumber ? '✓' : '✗'} One number
                    </p>
                    <p className={`text-xs ${errors.hasSpecialChar ? 'text-green-500' : 'text-red-500'}`}>
                      {errors.hasSpecialChar ? '✓' : '✗'} One special character
                    </p>
                    <p className={`text-xs ${errors.hasMinLength ? 'text-green-500' : 'text-red-500'}`}>
                      {errors.hasMinLength ? '✓' : '✗'} 9 or more characters
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create free account
              </button>
            </form>

            <p className="text-gray-500 text-sm mt-6">
              By creating an account, you agree to Shortly's{" "}
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
            <div className="max-w-md">
              <img src={logo} alt="Connections Platform" className="w-full" />
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
