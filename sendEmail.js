require("dotenv").config();
const nodemailer = require("nodemailer");

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
    .map(
      (repo) => `
      <li style="margin-bottom: 20px;">
        <a href="${
          repo.url
        }" style="font-size: 16px; font-weight: bold; color: #0366d6;">${
        repo.name
      }</a><br/>
        <span style="font-size: 14px; color: #586069;">
          ${repo.description || "No description available."}
        </span><br/>
        <span style="font-size: 13px; color: #6a737d;">
          ⭐ ${repo.stars.toLocaleString()} stars
        </span>
      </li>
    `
    )
    .join("");

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; padding: 20px;">
      <h2 style="color: #24292e;">🌟 Your Weekly Starred Repos</h2>
      <p style="font-size: 14px; color: #586069;">Here are the repositories you starred this week:</p>
      <ul style="padding-left: 20px; list-style: none;">
        ${items}
      </ul>
      <p style="font-size: 12px; color: #999999; margin-top: 40px;">
        You're receiving this email because you starred repositories on GitHub this week.<br/>
        Made with ❤️ by a Node.js script.
      </p>
    </div>
  `;
}

async function sendEmail(repos) {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: "Your GitHub Star Digest",
    html: formatEmailContent(repos),
  });

  console.log(`✅ Email sent: ${info.messageId}`);
}

module.exports = sendEmail;
