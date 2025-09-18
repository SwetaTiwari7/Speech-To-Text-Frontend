import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
        🎤 Speech to Text Converter
      </h1>
      <p className="text-lg md:text-xl mb-8 text-center max-w-2xl">
        Convert your audio to text quickly and easily. Try it free a few times, then sign up to unlock full history & unlimited use.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-3 rounded-lg bg-white text-blue-600 font-semibold hover:bg-gray-200 transition"
        >
          Try Free
        </button>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 rounded-lg bg-transparent border border-white font-semibold hover:bg-white hover:text-blue-600 transition"
        >
          Login / Register
        </button>
      </div>
    </div>
  );
}
