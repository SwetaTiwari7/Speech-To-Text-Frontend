import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-sm bg-white">
      <div className="text-2xl font-bold text-indigo-700">Speechify</div>
      <div className="flex gap-4">
        <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-indigo-700">
          Log In
        </Link>
        <Link
          to="/login"
          className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}