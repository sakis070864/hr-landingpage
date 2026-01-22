import React, { useState, useEffect, useCallback } from 'react';
import { X, ShieldCheck, Loader2 } from 'lucide-react';

interface CaptchaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onVerify: (question: string, answer: string, token: string) => Promise<boolean>;
}

const CaptchaModal: React.FC<CaptchaModalProps> = ({ isOpen, onClose, onVerify }) => {
    const [question, setQuestion] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [verifying, setVerifying] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchQuestion = useCallback(() => {
        setLoading(true);
        setError(null);
        setAnswer('');

        // Add timestamp to prevent browser caching
        fetch(`/api/generate-question?t=${Date.now()}`)
            .then(res => res.json())
            .then(data => {
                if (data.question && data.token) {
                    setQuestion(data.question);
                    setToken(data.token);
                } else {
                    setError('Failed to load security challenge.');
                }
            })
            .catch(() => setError('Failed to load security challenge.'))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (isOpen) {
            fetchQuestion();
        }
    }, [isOpen, fetchQuestion]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!answer.trim()) return;

        setVerifying(true);
        setError(null);

        try {
            const success = await onVerify(question, answer, token);

            if (!success) {
                setError("Incorrect answer. Loading new question...");
                setTimeout(() => {
                    fetchQuestion();
                }, 1500);
            }
        } catch (err) {
            setError("Verification error. Please try again.");
        } finally {
            setVerifying(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-md bg-[#0a0a0b] border border-white/10 rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                        <ShieldCheck className="w-6 h-6 text-purple-400" />
                    </div>

                    <h3 className="text-xl font-bold text-white">Security Check</h3>

                    <p className="text-slate-400 text-sm">
                        Please answer this quick question to prove you are human.
                    </p>

                    <div className="w-full bg-white/5 rounded-xl p-4 border border-white/5 my-2 min-h-[80px] flex items-center justify-center">
                        {loading ? (
                            <Loader2 className="w-6 h-6 text-purple-500 animate-spin" />
                        ) : error ? (
                            <p className="text-red-400 text-sm font-bold animate-pulse">{error}</p>
                        ) : (
                            <p className="text-purple-200 font-medium text-lg font-serif italic">"{question}"</p>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        <input
                            type="text"
                            placeholder="Type your answer..."
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            disabled={loading || verifying || !!(error && error.includes("Loading"))}
                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:border-purple-500 outline-none transition-all text-center font-bold disabled:opacity-50"
                            autoFocus
                        />

                        <button
                            type="submit"
                            disabled={loading || verifying || !answer.trim() || !!(error && error.includes("Loading"))}
                            className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-purple-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {verifying ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
                                </>
                            ) : (
                                "Verify & Send Request"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CaptchaModal;
