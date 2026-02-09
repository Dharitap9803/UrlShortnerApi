import { useNavigate } from "react-router-dom";

export default function Reset() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <h1 className="text-4xl font-bold text-blue-700" style={{ fontFamily: "'Pacifico', cursive" }}>
            Shortly
          </h1>
        </div>

        {/* Confirmation Message */}
        <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm text-center">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h2 className="text-lg font-bold text-gray-900">Check your inbox</h2>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            If we find a matching account, we'll send you an email with password recovery instructions.
          </p>
          <p className="text-sm text-gray-600">
            Didn't receive an email?{" "}
            <button
              onClick={() => navigate("/forgetpassword")}
              className="text-sm text-blue-600 hover:underline"
            >
              Check your spam folder
            </button>{" "}
            or{" "}
            <button
              onClick={() => navigate("/forgetpassword")}
              className="text-sm text-blue-600 hover:underline"
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
