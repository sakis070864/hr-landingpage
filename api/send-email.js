import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // Επιτρέπουμε μόνο POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: 'Missing name or email' });
    }

    try {
        // Δημιουργία transporter (Το Vercel βλέπει αυτόματα τα process.env)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Αποστολή του email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Στέλνουμε το email στον εαυτό μας
            replyTo: email, // Αν πατήσεις reply, να πάει στον χρήστη
            subject: `HR-Trainer Request: ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nRequesting access via Landing Page.`,
            html: `
                <h3>New Access Request</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
            `,
        });

        return res.status(200).json({ success: true, message: 'Email sent successfully!' });

    } catch (error) {
        console.error('SERVER ERROR:', error);
        // Επιστρέφουμε JSON με το σφάλμα για να δούμε τι φταίει (αν ξανασυμβεί)
        return res.status(500).json({ 
            success: false, 
            message: error.message || 'Internal Server Error' 
        });
    }
}