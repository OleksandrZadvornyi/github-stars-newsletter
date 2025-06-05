require("dotenv").config();
const axios = require("axios");

const PAT_GITHUB_TOKEN = process.env.PAT_GITHUB_TOKEN;
const USERNAME = "OleksandrZadvornyi"; // or any target username
const sendEmail = require("./sendEmail");

async function fetchStarredRepos(username) {
  const response = await axios.get(
    `https://api.github.com/users/${username}/starred`,
    {
      headers: {
        Authorization: `token ${PAT_GITHUB_TOKEN}`,
        "User-Agent": "newsletter-script",
        Accept: "application/vnd.github.v3.star+json",
      },
    }
  );

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago

  const recentRepos = response.data
    .filter((entry) => new Date(entry.starred_at) >= oneWeekAgo)
    .map((entry) => ({
      name: entry.repo.full_name,
      description: entry.repo.description,
      url: entry.repo.html_url,
      stars: entry.repo.stargazers_count,
      language: entry.repo.language,
      updated: entry.repo.updated_at,
      isFork: entry.repo.fork,
    }));

  return recentRepos;
}

fetchStarredRepos(USERNAME)
  .then((repos) => sendEmail(repos))
  .catch(console.error);
