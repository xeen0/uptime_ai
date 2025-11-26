import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SearchPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (username.trim()) navigate(`/${username.trim()}`);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="p-10 rounded-2xl border-2 border-gray-200 w-[90%] max-w-md">
        <h1 className="text-3xl font-semibold text-black text-center mb-8 tracking-wide">
          GitHub Profile Viewer
        </h1>

        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 transition-all duration-300"
            placeholder="Enter GitHub username"
          />

          <button
            type="submit"
            className="px-6 py-3 cursor-pointer rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
