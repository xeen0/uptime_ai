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
      <form onSubmit={handleSearch} className="flex gap-3">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border px-3 py-2 rounded"
          placeholder="Enter GitHub username"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>
    </div>
  );
}
