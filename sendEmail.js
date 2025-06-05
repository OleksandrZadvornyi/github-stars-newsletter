require("dotenv").config();
const nodemailer = require("nodemailer");

const subject = process.env.EMAIL_SUBJECT || "Your GitHub Star Digest";

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASS,
  },
});

function formatEmailContent(repos) {
  const items = repos
    .map((repo) => {
      const updatedDate = new Date(repo.updated).toLocaleDateString("en-US");
      return `
        <li style="border: 1px solid #e1e4e8; border-radius: 6px; padding: 16px; margin-bottom: 16px; list-style: none;">
          <a href="${
            repo.url
          }" style="font-size: 16px; font-weight: bold; color: #0366d6; text-decoration: none;">
            ${repo.name}
          </a>
          ${repo.isFork ? '<span style="color: #6a737d;"> (fork)</span>' : ""}
          <p style="margin: 8px 0 4px; font-size: 14px; color: #586069;">
            ${repo.description || "No description provided."}
          </p>
          <div style="font-size: 13px; color: #6a737d;">
            ⭐ ${repo.stars.toLocaleString()}
            ${repo.language ? ` • 🧠 ${repo.language}` : ""}
            • 📅 Updated ${updatedDate}
          </div>
        </li>
      `;
    })
    .join("");

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; padding: 24px;">
      <h2 style="color: #24292e;">🌟 Your Weekly Starred Repos</h2>
      <p style="font-size: 14px; color: #586069;">Here’s a summary of what you starred this week:</p>
      <ul style="padding: 0; margin: 0;">
        ${items}
      </ul>
      <hr style="margin: 40px 0;" />
      <p style="font-size: 12px; color: #999;">
        Generated with ❤️ using GitHub API + Node.js.
      </p>
    </div>
  `;
}

async function sendEmail(repos) {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject,
    html: formatEmailContent(repos),
  });

  console.log(`✅ Email sent: ${info.messageId}`);
}

module.exports = sendEmail;
