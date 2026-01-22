import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export default async function handler(req, res) {
    console.log("=== API /api/send-email CALLED ===");

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email } = req.body;

    // Debug logs to see if env vars are loaded
    console.log("Authentication Check:");
    console.log(`- EMAIL_USER exists: ${!!process.env.EMAIL_USER}`);
    console.log(`- EMAIL_PASSWORD exists: ${!!process.env.EMAIL_PASSWORD}`);

    if (!name || !email) {
        return res.status(400).json({ message: 'Missing name or email' });
    }

    // Configure Nodemailer with Gmail SMTP
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    try {
        console.log("Attempting to send mail...");
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Sending TO yourself
            replyTo: email,
            subject: `HR-Trainer: Access Request from ${name}`,
            text: `Hello,\n\n${name} (${email}) has requested access to the HR-Trainer simulation.\n\nBest,\nHR-Trainer App`,
            html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #7e22ce;">New Access Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 14px; color: #666;">This request was sent from your HR-Trainer Landing Page.</p>
        </div>
      `,
        });

        console.log("Mail sent successfully:", info.messageId);
        return res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('SERVER ERROR SENDING EMAIL:', error);
        // Return the actual error message to the client for debugging
        return res.status(500).json({
            message: 'Error sending email',
            error: error.message,
            code: error.code,
            command: error.command
        });
    }
}
