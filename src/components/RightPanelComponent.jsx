import React, {  useEffect, useState } from "react";
import GraphComponent from "./GraphComponent";
import {getPopularRepos} from "../utils";
export default function GitHubProfile({
  user
}) {
  const [popularRepos, setPopularRepo] = useState([]);
  useEffect(() => {
    async function fetchPopularRepos() {
      const repos = await getPopularRepos(user.login);
      setPopularRepo(repos);
      console.log("Popular Repos:", repos);
    }
    fetchPopularRepos();
  }, [user.login]);
  return (
    <div className="w-full max-w-7xl mx-auto px-6">
      
      <h2 className="text-xl font-semibold mb-4">Popular repositories</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {popularRepos?.map((repo, idx) => (
          <a
            key={idx}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border rounded-lg p-4 hover:bg-gray-50 transition"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-blue-600 font-semibold">{repo.name}</h3>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {repo.visibility || "Public"}
              </span>
            </div>
            <p className="text-sm text-gray-700 mt-1">{repo.description}</p>

            <div className="flex items-center gap-4 text-xs mt-3">
              <span className="flex items-center gap-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: repo.languageColor || "#f1e05a" }}
                ></div>
                {repo.language}
              </span>
              {repo.stars !== undefined && (
                <span>⭐ {repo.stars}</span>
              )}
            </div>
          </a>
        ))}
      </div>

      <GraphComponent username={user.login}/>
    </div>
  );
}
