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
    <li style="margin-bottom: 10px;">
      <a href="${repo.url}" target="_blank"><strong>${
        repo.name
      }</strong></a><br />
      <span>${repo.description || "No description"}</span><br />
      ⭐ ${repo.stars}
    </li>
  `
    )
    .join("");

  return `
    <h2>⭐ Your Weekly Starred Repos</h2>
    <ul style="font-family: sans-serif; padding-left: 20px;">
      ${items}
    </ul>
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
