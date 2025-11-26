import { useParams, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

import OverviewPage from "./OverviewPage";

export default function ProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [input, setInput] = useState(username);
  const [loading, setLoading] = useState(true);
  const [userExists, setUserExists] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    async function fetchUser() {
      try {
        setLoading(true);
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (isCancelled) return;
        if (res.status === 404) {
          setUserExists(false);
          setUser(null);
        } else {
          const data = await res.json();
          setUserExists(true);
          setUser(data);
        }
      } catch {
        if (!isCancelled) {
          setUserExists(false);
          setUser(null);
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }
    fetchUser();
    return () => {
      isCancelled = true;
    };
  }, [username]);

  const memoUser = useMemo(() => user, [user]);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed && trimmed !== username) {
      navigate(`/${trimmed}`);
    }
  };

  return (
    <div className="p-6 w-full">
      <form onSubmit={handleSearch} className="flex gap-3 mb-10">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 transition-all duration-300"
          placeholder="Enter GitHub username"
        />
        <button 
            className="px-6 py-3 cursor-pointer rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium  transition-all duration-300"
            type="submit"
        >Search</button>
      </form>

      {loading && <p className="text-gray-500">Loading…</p>}

      {!loading && !userExists && <h1>username not found</h1>}

      {!loading && userExists && (
        <>
          <div className="border-b flex gap-6 mb-6">
            <NavLink to={`/${username}`} end className={tabStyle}>Overview</NavLink>
            <NavLink to={`/${username}/repositories`} className={tabStyle}>Repositories</NavLink>
            <NavLink to={`/${username}/projects`} className={tabStyle}>Projects</NavLink>
            <NavLink to={`/${username}/packages`} className={tabStyle}>Packages</NavLink>
          </div>
          {(() => {
            const subPath = location.pathname.replace(`/${username}`, "");
            const currentTab = subPath.startsWith("/") ? subPath.slice(1) : "";
            return (
              <>
                <div className={currentTab === "" ? "" : "hidden"}>
                  <OverviewPage user={memoUser} />
                </div>
                <div className={currentTab === "repositories" ? "" : "hidden"}>
                  <h1> Repository Page</h1>
                </div>
                <div className={currentTab === "projects" ? "" : "hidden"}>
                  <h1>Projects Page</h1>
                </div>
                <div className={currentTab === "packages" ? "" : "hidden"}>
                  <h1>Packages Page</h1>
                </div>
              </>
            );
          })()}
        </>
      )}
    </div>
  );
}

const tabStyle = ({ isActive }) =>
  `pb-2 border-b-2 cursor-pointer capitalize ${
    isActive ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600"
  }`;
