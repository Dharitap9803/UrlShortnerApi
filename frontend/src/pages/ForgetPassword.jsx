import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email);

    // Simulate API call to check email
    try {
      const response = await fetch("http://localhost:8001/auth/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Email not registered. Please try again.");
      }
    } catch (error) {
      console.error("Error checking email:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Logo */}
          <div className="flex justify-center mb-12">
            <h1 className="text-4xl font-bold text-orange-500">shortly.</h1>
          </div>

          {/* Confirmation Message */}
          <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-start justify-center mb-2">
              <svg className="w-3 h-3 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h2 className="text-xs font-medium text-gray-900">Check your inbox</h2>
            </div>
            <p className="text-xs text-gray-500 mb-1.5">
              If we find a matching account, we'll send you an email with password recovery instructions.
            </p>
            <p className="text-xs text-gray-500">
              Didn't receive an email?{" "}
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-blue-600 hover:underline"
              >
                Check your spam folder
              </button>{" "}
              or{" "}
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-blue-600 hover:underline"
              >
                try another email address
              </button>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Container */}
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <h1 className="text-4xl font-bold text-orange-500">shortly.</h1>
        </div>

        {/* Forgot Password Form */}
        <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Forgot your password?</h2>
          <p className="text-gray-600 mb-6">
            It happens to the best of us. Enter your email or username to request a password reset link.
          </p>

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

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Reset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
