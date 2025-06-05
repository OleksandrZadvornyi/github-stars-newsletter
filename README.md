# ✨ GitHub Stars Newsletter

Automatically send yourself a weekly email digest of repositories you've starred on GitHub – beautifully formatted and fully automated.

![GitHub Stars Newsletter](https://img.shields.io/github/actions/workflow/status/OleksandrZadvornyi/github-stars-newsletter/newsletter.yml?branch=main&label=send-newsletter)

## 📌 Features

- ⏱️ Runs weekly via GitHub Actions
- 🌐 Fetches your starred repos using GitHub API
- 📬 Sends an HTML email via Mailgun (or any SMTP provider)
- 🎨 Styled output with repo metadata (language, stars, last updated, forked)
- ⚙️ Fully configurable via `.env` file
- 💡 Great for keeping track of projects you love

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/github-stars-newsletter.git
cd github-stars-newsletter
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env` file:

```bash
PAT_GITHUB_TOKEN=ghp_xxx                     # GitHub Personal Access Token
MAILGUN_USER=postmaster@sandboxXXXX.mailgun.org
MAILGUN_PASS=your_mailgun_smtp_password
EMAIL_FROM=Your Name <you@example.com>
EMAIL_TO=Your Name <you@example.com>
TARGET_USERNAME=YourGitHubUsername
REPO_LIMIT=10
EMAIL_SUBJECT=Your GitHub Star Digest
```

> 💡 Use a GitHub PAT with public_repo scope.
> For Mailgun, either upgrade your account or authorize recipients.

### 💌 Run It Locally

```bash
node fetchStars.js
```

You should receive an email with the latest starred repositories.

## 🔁 Automate with GitHub Actions

This project includes a ready-to-use GitHub Actions workflow.

### 1. Add repository secrets

Go to **Settings > Secrets and variables > Actions** and add the following:

| Secret Name         | Value                       |
| ------------------- | --------------------------- |
| PAT_GITHUB_TOKEN    | Your GitHub PAT             |
| MAILGUN_USER        | SMTP login from Mailgun     |
| MAILGUN_PASS        | SMTP password from Mailgun  |
| EMAIL_FROM          | Sender email (name + email) |
| EMAIL_TO            | Recipient email             |
| TARGET_USERNAME     | GitHub username to track    |
| REPO_LIMIT          | Number of repos to include  |
| EMAIL_SUBJECT       | Email subject line          |

### 2. Workflow Details

Located at `.github/workflows/send-newsletter.yml`. Runs every Monday at 09:00 UTC by default.

## 🛠 Customization

- 💅 Style the email by editing `formatEmailContent()` in `sendEmail.js`
- 📄 Add more repo metadata (forks, license, topics, etc.)
- 🔌 Switch from Mailgun to Gmail, Sendinblue, etc. using Nodemailer transports

## 📚 Technologies

- Node.js
- GitHub REST API
- Nodemailer
- Mailgun SMTP
- GitHub Actions

## 💡 Inspiration

This project was built for automation, exploration and fun. It helps you stay in touch with projects you've starred – in your inbox, every week.

## 📄 License

MIT
