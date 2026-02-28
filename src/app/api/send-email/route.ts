import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { teamName, teamSize, leader, teamMembers } = await req.json();
    const whatsappGroupLink = process.env.WHATSAPP_GROUP_LINK;

    // 🔥 Members as stacked cards (mobile safe)
    const membersList = teamMembers
      .map(
        (m: any, i: number) => `
        <div style="padding:16px; border:1px solid #e5e7eb; border-radius:8px; margin-bottom:12px;">
          <p style="margin:4px 0; font-weight:600;">Member #${i + 2}</p>
          <p style="margin:4px 0;"><strong>Name:</strong> ${m.firstName} ${m.lastName}</p>
          <p style="margin:4px 0; word-break:break-word;">
            <strong>Email:</strong> 
            <a href="mailto:${m.email}" style="color:#2563eb; text-decoration:none;">
              ${m.email}
            </a>
          </p>
          <p style="margin:4px 0;"><strong>Institute:</strong> ${m.instituteName}</p>
        </div>
      `
      )
      .join('');

    await transporter.sendMail({
      from: `"Ignition HackVerse 2026" <${process.env.EMAIL_USER}>`,
      to: leader.email,
      subject: `🎉 Ignition HackVerse 2026 | Registration Confirmed - Team ${teamName}`,
      html: `
      <div style="font-family:Arial, sans-serif; padding:20px; background-color:#f3f4f6;">
        <div style="max-width:600px; margin:auto; background:#ffffff; padding:24px; border-radius:12px; border:1px solid #e5e7eb;">

          <h2 style="margin-top:0;">🎉 Registration Confirmed!</h2>

          <p>Dear <strong>${leader.firstName} ${leader.lastName}</strong>,</p>

          <p>
            Your team <strong>${teamName}</strong> has been successfully registered for 
            <strong>Ignition HackVerse 2026</strong>.
          </p>

          <!-- Team Summary -->
          <div style="padding:16px; border:1px solid #e5e7eb; border-radius:8px; margin-top:16px;">
            <p style="margin:4px 0;"><strong>Team Name:</strong> ${teamName}</p>
            <p style="margin:4px 0;"><strong>Team Size:</strong> ${teamSize}</p>
          </div>

          <!-- Leader Section -->
          <h3 style="margin-top:24px;">👤 Team Leader Details</h3>
          <div style="padding:16px; border:1px solid #e5e7eb; border-radius:8px;">
            <p style="margin:4px 0;"><strong>Name:</strong> ${leader.firstName} ${leader.lastName}</p>
            <p style="margin:4px 0; word-break:break-word;">
              <strong>Email:</strong> 
              <a href="mailto:${leader.email}" style="color:#2563eb; text-decoration:none;">
                ${leader.email}
              </a>
            </p>
            <p style="margin:4px 0;"><strong>Institute:</strong> ${leader.instituteName}</p>
          </div>

          <!-- Members -->
          <h3 style="margin-top:24px;">👥 Team Members</h3>
          <div style="margin-top:12px;">
            ${membersList}
          </div>

          <!-- WhatsApp Section -->
          <div style="margin-top:24px; text-align:center;">
            <p style="margin-bottom:10px; font-weight:600;">
              📢 Join Official WhatsApp Group
            </p>
            <p style="margin-bottom:16px;">
              Stay updated with important announcements and event instructions.
            </p>
            <a href="${whatsappGroupLink}"
              style="display:inline-block; background:#16a34a; color:white; padding:12px 20px;
              text-decoration:none; border-radius:6px; font-weight:600;">
              👉 Join WhatsApp Group
            </a>
          </div>

          <!-- Important Note -->
          <div style="margin-top:24px; font-size:14px;">
            <p>
              ⚠ <strong>Important:</strong> If your team is not selected for Round 2, 
              50% of the registration amount will be refunded.
            </p>
          </div>

          <!-- Contact Section -->
          <hr style="margin:24px 0; border:none; border-top:1px solid #e5e7eb;" />

          <h3>📞 For Any Queries, Contact:</h3>
          <div style="padding:16px; border:1px solid #e5e7eb; border-radius:8px;">
            <p style="margin:6px 0;">
              <strong>Shreyash Dhavale</strong><br/>
              📱 +91 9876543210
            </p>

            <p style="margin:6px 0;">
              <strong>Event Coordinator</strong><br/>
              📱 +91 9123456789
            </p>
          </div>

          <!-- Footer -->
          <p style="margin-top:24px; font-size:14px;">
            We look forward to your innovation and creativity at Ignition HackVerse 2026. 🚀
          </p>

          <p style="font-size:14px;">
            Warm Regards,<br/>
            <strong>Ignition HackVerse 2026 Team</strong>
          </p>

        </div>
      </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}