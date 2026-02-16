import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthAPI } from "../api";
import googleLogo from "../assets/google.png";
import logo2 from "../assets/logo2.png";
import eyeOpen from "../assets/eyeopen.png";
import eyeClosed from "../assets/eyeclosed.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);
  const [errors, setErrors] = useState({
    hasLetter: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasMinLength: false,
    emailEmpty: false,
    passwordEmpty: false
  });
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");

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

    return { hasLetter, hasNumber, hasSpecialChar, hasMinLength };
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

    return !(isEmailEmpty || isPasswordEmpty);
  };

  const loginWithGoogle = async () => {
    alert("Google sign-in is not connected to the backend yet. Please use email and password.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    try {
      const { data } = await AuthAPI.login({ email, password });
      localStorage.setItem("token", data.token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      navigate("/links");
    } catch (error) {
      const msg = error.response?.data?.error || error.message || "Failed to sign in. Please check your email and password.";
      setSubmitError(msg);
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
            {submitError && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{submitError}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (touched) {
                      setErrors(prev => ({
                        ...prev,
                        emailEmpty: e.target.value.length === 0
                      }));
                    }
                  }}
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
                    onFocus={() => {
                      if (!touched) {
                        setTouched(true);
                        if (password.length > 0) validatePassword(password);
                      }
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
                        <span className="text-xs text-blue-600">Hide</span>
                      </>
                    ) : (
                      <>
                        <img src={eyeClosed} alt="Show" className="w-4 h-4 mr-1" />
                        <span className="text-xs text-blue-600">Show</span>
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
