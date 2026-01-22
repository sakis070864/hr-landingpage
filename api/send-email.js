import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";
import jwt from 'jsonwebtoken';

// Force load env vars
dotenv.config({ path: '.env.local' });
dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, captchaAnswer, captchaQuestion, captchaToken } = req.body;

  // Debug Log Input
  console.log("VERIFY REQUEST RECEIVED:");
  console.log("- Name:", name);
  console.log("- Question:", captchaQuestion);
  console.log("- Answer:", captchaAnswer);
  console.log("- Token Present:", !!captchaToken);
  console.log("- API Key Present:", !!process.env.GEMINI_API_KEY);

  if (!name || !email || !captchaAnswer || !captchaQuestion || !captchaToken) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // 1. Verify Token Integrity
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("CRITICAL: GEMINI_API_KEY is missing in backend.");
    return res.status(500).json({ message: 'Server configuration error (Missing API Key).' });
  }

  try {
    const decoded = jwt.verify(captchaToken, apiKey);
    if (decoded.question !== captchaQuestion) {
      console.error("Token Mismatch! Decoded:", decoded.question, "Received:", captchaQuestion);
      throw new Error("Question mismatch");
    }
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ message: 'Security check failed (Invalid Token).', details: err.message });
  }

  // 2. Verify Answer with AI
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash" });

    const verificationPrompt = `
      Question: "${captchaQuestion}"
      User Answer: "${captchaAnswer}"
      
      Is this answer correct? 
      Strict rules:
      - If it is correct or close enough (spelling mistakes ok), reply "YES".
      - If it is a valid synonym or alternative answer, reply "YES".
      - If it is wrong, reply "NO".
      - Do not add any other text.
    `;

    const result = await model.generateContent(verificationPrompt);
    const verdict = result.response.text().trim().toUpperCase();
    console.log("Gemini Verdict:", verdict);

    if (!verdict.includes("YES")) {
      return res.status(400).json({ message: `Incorrect answer. AI Verdict: ${verdict}` });
    }
  } catch (error) {
    console.error("AI Verification failed:", error);
    return res.status(500).json({ message: 'Error calling Gemini AI.', details: error.message });
  }

  // 3. Send Email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `HR-Trainer: Verified Request from ${name}`,
      text: `Hello,\n\n${name} (${email}) has passed the AI verification.\n\nQuestion: ${captchaQuestion}\nAnswer: ${captchaAnswer}`,
      html: `<p>New verified request from <strong>${name}</strong> (${email}).</p>`,
    });

    console.log("Email sent successfully.");
    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email sending failed:', error);
    return res.status(500).json({ message: 'Error sending email (SMTP).', details: error.message });
  }
}