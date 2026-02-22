// utils/sendEmail.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

const whatsappGroupLink = process.env.WHATSAPP_GROUP_LINK || 'https://chat.whatsapp.com/yourlink';

async function sendRegistrationEmail({ teamName, teamSize, leader, teamMembers }) {
  const membersList = teamMembers.map((m, i) => `
    <tr style="border-bottom: 1px solid #ccc;">
      <td style="padding: 10px;">${i + 2}</td>
      <td style="padding: 10px;">${m.firstName} ${m.lastName}</td>
      <td style="padding: 10px;">
        <a href="mailto:${m.email}" style="color: #007bff; text-decoration: none;">${m.email}</a>
      </td>
      <td style="padding: 10px;">${m.instituteName}</td>
    </tr>
  `).join('');

  const mailOptions = {
    from: `"Ignition HackVerse 2026" <${process.env.EMAIL_USER}>`,
    to: leader.email,
    subject: `✅ Registration Confirmed — Team ${teamName} | Ignition HackVerse 2026`,
    html: `
      <div style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; text-align: center;">
        <div style="background: #ffffff; padding: 30px; border-radius: 10px; max-width: 600px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <h2 style="color: #2c3e50;">✅ Hackathon Registration Successful!</h2>
          <p style="font-size: 16px; color: #555;">Dear <strong>${leader.firstName} ${leader.lastName}</strong>,</p>
          <p style="font-size: 16px; color: #555;">Congratulations! Your team <strong style="color: #27ae60;">${teamName}</strong> has been successfully registered for the hackathon.</p>

          <hr style="border: 1px solid #ddd;">

          <h3 style="color: #e67e22;">📢 Join WhatsApp Group:</h3>
          <p>Stay updated with important announcements. Click below to join our WhatsApp group:</p>
          <a href="${whatsappGroupLink}"
             style="display: inline-block; background: #27ae60; color: white; padding: 12px 20px; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 5px;">
            👉 Join WhatsApp Group
          </a>

          <hr style="border: 1px solid #ddd;">

          <h3 style="color: #34495e;">🔹 Team Details:</h3>
          <div style="background: #ecf0f1; padding: 15px; border-radius: 8px; text-align: left;">
            <p><strong>🏆 Team Name:</strong> <span style="color: #3498db;">${teamName}</span></p>
            <p><strong>👥 Team Size:</strong> <span style="color: #e74c3c; font-size: 18px;">${teamSize}</span></p>
          </div>

          <h3 style="color: #34495e;">👤 Leader Details:</h3>
          <div style="background: #f9e79f; padding: 15px; border-radius: 8px; text-align: left;">
            <p><strong>📌 Name:</strong> ${leader.firstName} ${leader.lastName}</p>
            <p><strong>✉ Email:</strong> <a href="mailto:${leader.email}" style="color: #007bff; text-decoration: none;">${leader.email}</a></p>
            <p><strong>🏛 Institute:</strong> ${leader.instituteName}</p>
          </div>

          <h3 style="color: #34495e;">👥 Team Members:</h3>
          <table style="width: 100%; border-collapse: collapse; background: #d4efdf; border-radius: 8px;">
            <tr style="background: #27ae60; color: white;">
              <th style="padding: 10px;">#</th>
              <th style="padding: 10px;">Name</th>
              <th style="padding: 10px;">Email</th>
              <th style="padding: 10px;">Institute</th>
            </tr>
            ${membersList}
          </table>

          <hr style="border: 1px solid #ddd;">

          <p style="font-size: 13px; color: #999; margin-top: 16px;">
            ⚠️ Note: If you are not selected for Round 2, 50% of your amount will be refunded.
          </p>

          <br>
          <p style="font-size: 14px; color: #777;">Best Regards,<br><strong>Ignition HackVerse Team</strong></p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendRegistrationEmail };