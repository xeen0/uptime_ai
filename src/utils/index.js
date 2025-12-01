import axios from "axios";
import reposData from "../data/repomock.json";

const BASE_URL = "https://api.github.com/users";

export const getUser = async (username) => {
  return axios.get(`${BASE_URL}/${username}`).then((res) => res.data);
};

export const getContributions = async (username) => {
  return axios
    .get(`https://github-contributions-api.jogruber.de/v4/${username}`)
    .then((res) => res.data);
};

export const getRepos = async ({ search = "", page = 1, per_page = 10 } = {}) => {
  let filtered = reposData;

  if (search && search.trim() !== "") {
    const s = search.trim().toLowerCase();
    filtered = filtered.filter((repo) =>
      repo.name.toLowerCase().includes(s)
    );
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / per_page);

  const start = (page - 1) * per_page;
  const end = start + per_page;

  const paginated = filtered.slice(start, end);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: paginated,
        total,
        page,
        per_page,
        totalPages,
      });
    }, 100); 
  });
};

export const getPopularRepos = async () => {
  return reposData.slice(0, 6);
}