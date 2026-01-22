import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Generate a simple common sense question for a human check (e.g. 'What is 2+2?'). Return ONLY the question text.");
        return res.status(200).json({ question: result.response.text().trim() });
    } catch (e) {
        return res.status(200).json({ question: "What is 2 + 2?" });
    }
}