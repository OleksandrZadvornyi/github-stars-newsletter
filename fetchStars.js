require("dotenv").config();
const axios = require("axios");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const USERNAME = "OleksandrZadvornyi"; // or any target username

async function fetchStarredRepos(username) {
  const response = await axios.get(
    `https://api.github.com/users/${username}/starred`,
    {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        "User-Agent": "newsletter-script",
      },
    }
  );

  return response.data.map((repo) => ({
    name: repo.full_name,
    description: repo.description,
    url: repo.html_url,
    stars: repo.stargazers_count,
  }));
}

fetchStarredRepos(USERNAME)
  .then((repos) => {
    console.log(repos);
  })
  .catch(console.error);
