import axios from "axios";

const BASE_URL = "https://api.github.com/users";

export const getUser = async (username) => {
  return axios.get(`${BASE_URL}/${username}`).then((res) => res.data);
};

export const getContributions = async (username) => {
  return axios
    .get(`https://github-contributions-api.jogruber.de/v4/${username}`)
    .then((res) => res.data);
};
