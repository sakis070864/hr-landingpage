import { GoogleGenerativeAI } from "@google/generative-ai";
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
        return res.status(500).json({ message: 'GEMINI_API_KEY not configured' });
    }

    // 1. Force No-Cache Headers to prevent Vercel/Browser caching
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            // 2. High temperature for maximum variety
            generationConfig: {
                temperature: 1.0,
            }
        });

        const topics = ["space", "animals", "colors", "shapes", "simple math", "geography", "food"];
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        const randomSeed = Math.floor(Math.random() * 999999);

        const prompt = `Generate a single, very simple trivia question about ${randomTopic} that a 12-year-old would know. Random seed: ${randomSeed}. Do NOT repeat previous questions. Do not provide the answer.`;

        // User asked for "gemini 2.5 flash". This version doesn't exist publicly yet (1.5 is standard, 2.0 is exp). 
        // We will try it, and fallback to 3-preview if it fails, ensuring we NEVER use 1.5 per user request.
        let question;
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            question = response.text().trim();
        } catch (modelError) {
            console.warn("Gemini 2.5 failed. Falling back to Gemini 3 Flash Preview as requested.");
            const fallbackModel = genAI.getGenerativeModel({
                model: "gemini-3-flash-preview",
                generationConfig: { temperature: 1.0 }
            });
            const fallbackResult = await fallbackModel.generateContent(prompt);
            const fallbackResponse = await fallbackResult.response;
            question = fallbackResponse.text().trim();
        }

        // Sign the question to prevent client-side spoofing
        // We use the API Key as the secret since we know the server has it
        const token = jwt.sign({ question }, apiKey, { expiresIn: '5m' });

        res.status(200).json({ question, token });
    } catch (error) {
        console.error('Error generating question:', error);
        res.status(500).json({
            message: 'Error generating question',
            details: error.message,
            fullError: error.toString()
        });
    }
}
