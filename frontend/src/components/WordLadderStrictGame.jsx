// Theme 1

// import React, { useEffect, useState } from "react";
// import {
//     FaSearch,
//     FaCheck,
//     FaLightbulb,
//     FaSyncAlt,
//     FaSortAlphaDownAlt,
//     FaSortAlphaUpAlt,
//     FaTimesCircle,
//     FaCheckCircle,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// const WordLadderStrictGame = () => {
//     const [ladder, setLadder] = useState([]);
//     const [start, setStart] = useState("");
//     const [end, setEnd] = useState("");
//     const [guess1, setGuess1] = useState("");
//     const [guess2, setGuess2] = useState("");
//     const [step, setStep] = useState(1);
//     const [result, setResult] = useState({ type: "", message: null });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [hintRevealed1, setHintRevealed1] = useState(false);
//     const [hintRevealed2, setHintRevealed2] = useState(false);

//     const fetchPuzzle = async () => {
//         try {
//             setLoading(true);
//             const res = await fetch("http://127.0.0.1:5000/api/generate");
//             const data = await res.json();
//             if (res.ok) {
//                 setLadder(data.ladder);
//                 setStart(data.start);
//                 setEnd(data.end);
//                 setGuess1("");
//                 setGuess2("");
//                 setStep(1);
//                 setResult({ type: "", message: null });
//                 setError("");
//                 setHintRevealed1(false);
//                 setHintRevealed2(false);
//             } else {
//                 setError(data.error || "Failed to generate puzzle.");
//             }
//         } catch {
//             setError("Server not reachable.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchPuzzle();
//     }, []);

//     const handleFirstGuess = (e) => {
//         e.preventDefault();
//         if (guess1.toLowerCase() === ladder[1]) {
//             setStep(2);
//             setResult({ type: "", message: null });
//         } else {
//             setResult({
//                 type: "error",
//                 message: <><FaTimesCircle className="inline mr-2" />Incorrect Guess. Try again.</>,
//             });
//         }
//     };

//     const handleSecondGuess = (e) => {
//         e.preventDefault();
//         if (guess2.toLowerCase() === ladder[2]) {
//             setStep(3);
//             setResult({
//                 type: "success",
//                 message: <><FaCheckCircle className="inline mr-2" />Correct! You solved the ladder.</>,
//             });
//         } else {
//             setResult({
//                 type: "error",
//                 message: <><FaTimesCircle className="inline mr-2" />Incorrect Guess. Try again.</>,
//             });
//         }
//     };

//     const handleHint = () => {
//         if (step === 1) {
//             setHintRevealed1(true);
//             setGuess1(ladder[1]);
//             setStep(2);
//             setResult({ type: "", message: null });
//         } else if (step === 2) {
//             setHintRevealed2(true);
//             setGuess2(ladder[2]);
//             setStep(3);
//             setResult({
//                 type: "success",
//                 message: <><FaCheckCircle className="inline mr-2" />Solved using a hint!</>,
//             });
//         }
//     };

//     const handleReset = () => fetchPuzzle();

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1a1a40] to-[#0f172a] flex items-center justify-center px-4">
//             <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 1 }}
//                 className="w-full max-w-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 backdrop-blur-md text-white"
//             >
//                 <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8">
//                     <FaSortAlphaDownAlt className="inline m-2 text-indigo-300 animate-bounce" />
//                     Word Ladder
//                     <FaSortAlphaUpAlt className="inline m-2 text-indigo-300 animate-bounce" />
//                 </h1>
//                 {/* Display step progress bar */}
//                 {!loading && (
//                     <div className="mb-6 w-full bg-white/20 rounded-full h-3">
//                         <motion.div
//                             className={`h-3 rounded-full bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500`}
//                             animate={{ width: step === 1 ? "33.33%" : step === 2 ? "66.66%" : "100%" }}
//                             transition={{ duration: 0.5 }}
//                         />
//                     </div>
//                 )}

//                 {/* Display loading */}
//                 {loading ? (
//                     <p className="text-center text-white/80">Loading puzzle...</p>
//                 ) : error ? (
//                     <p className="text-red-400 text-center">{error}</p>
//                 ) : (
//                     <>
//                         <div className="flex justify-center gap-3 mb-6 text-lg font-mono">
//                             {[start, step > 1 || hintRevealed1 ? ladder[1] : "____", step > 2 || hintRevealed2 ? ladder[2] : "____", end].map(
//                                 (word, idx) => (
//                                     <motion.span
//                                         key={idx}
//                                         whileHover={{ scale: 1.05 }}
//                                         className={`px-4 py-2 rounded-xl shadow-md transition-all duration-300 ${idx === 0 || idx === 3
//                                             ? "bg-purple-600"
//                                             : word !== "____"
//                                                 ? "bg-cyan-600"
//                                                 : "bg-slate-700"
//                                             }`}
//                                     >
//                                         {word}
//                                     </motion.span>
//                                 )
//                             )}
//                         </div>
//                         {/* Conditional rendering for first guess input */}
//                         {step === 1 && (
//                             <form onSubmit={handleFirstGuess} className="space-y-4">
//                                 <input
//                                     type="text"
//                                     value={guess1}
//                                     onChange={(e) => {
//                                         setGuess1(e.target.value);
//                                         setResult({ type: "", message: null });
//                                     }}
//                                     placeholder="Guess the first intermediate word"
//                                     className="w-full p-3 bg-white/10 text-white border border-white/20 rounded-xl placeholder-white/60 focus:ring-4 focus:ring-indigo-400 focus:outline-none transition"
//                                 />
//                                 <button
//                                     type="submit"
//                                     className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-2 rounded-xl transition"
//                                 >
//                                     <FaSearch className="inline mr-2" /> Submit First Guess
//                                 </button>
//                             </form>
//                         )}
//                         {/* Conditional rendering for second guess input */}
//                         {step === 2 && (
//                             <form onSubmit={handleSecondGuess} className="space-y-4">
//                                 <input
//                                     type="text"
//                                     value={guess2}
//                                     onChange={(e) => {
//                                         setGuess2(e.target.value);
//                                         setResult({ type: "", message: null });
//                                     }}
//                                     placeholder="Guess the second intermediate word"
//                                     className="w-full p-3 bg-white/10 text-white border border-white/20 rounded-xl placeholder-white/60 focus:ring-4 focus:ring-green-400 focus:outline-none transition"
//                                 />
//                                 <button
//                                     type="submit"
//                                     className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-2 rounded-xl transition"
//                                 >
//                                     <FaCheck className="inline mr-2" /> Submit Final Guess
//                                 </button>
//                             </form>
//                         )}

//                         {/* Feedback message */}
//                         <AnimatePresence>
//                             {result.message && (
//                                 <motion.p
//                                     key="feedback"
//                                     initial={{ opacity: 0, y: -10 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     exit={{ opacity: 0, y: -10 }}
//                                     transition={{ duration: 0.8 }}
//                                     className={`mt-6 text-center text-lg font-bold rounded-xl px-6 py-3 transition duration-300 ${
//                                         result.type === "success"
//                                             ? "bg-green-600 text-white"
//                                             : "bg-red-500 text-white"
//                                     }`}
//                                 >
//                                     {result.message}
//                                 </motion.p>
//                             )}
//                         </AnimatePresence>

//                         {/* Conditional rendering for hints */}
//                         <div className="flex gap-4 mt-6">
//                             {step < 3 && (
//                                 <button
//                                     onClick={handleHint}
//                                     className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-xl transition"
//                                 >
//                                     <FaLightbulb className="inline mr-2" /> Reveal Hint
//                                 </button>
//                             )}
//                             <button
//                                 onClick={handleReset}
//                                 className="flex-1 bg-slate-700 hover:bg-slate-800 text-white py-2 rounded-xl transition"
//                             >
//                                 <FaSyncAlt className="inline mr-2" /> New Puzzle
//                             </button>
//                         </div>
//                     </>
//                 )}
//             </motion.div>
//         </div>
//     );
// };

// export default WordLadderStrictGame;


// Theme 2

// import React, { useEffect, useState } from "react";
// import {
//     FaSearch,
//     FaCheck,
//     FaLightbulb,
//     FaSyncAlt,
//     FaSortAlphaDownAlt,
//     FaSortAlphaUpAlt,
//     FaTimesCircle,
//     FaCheckCircle,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// const WordLadderStrictGame = () => {
//     const [ladder, setLadder] = useState([]);
//     const [start, setStart] = useState("");
//     const [end, setEnd] = useState("");
//     const [guess1, setGuess1] = useState("");
//     const [guess2, setGuess2] = useState("");
//     const [step, setStep] = useState(1);
//     const [result, setResult] = useState({ type: "", message: null });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [hintRevealed1, setHintRevealed1] = useState(false);
//     const [hintRevealed2, setHintRevealed2] = useState(false);

//     const fetchPuzzle = async () => {
//         try {
//             setLoading(true);
//             const res = await fetch("http://127.0.0.1:5000/api/generate");
//             const data = await res.json();
//             if (res.ok) {
//                 setLadder(data.ladder);
//                 setStart(data.start);
//                 setEnd(data.end);
//                 setGuess1("");
//                 setGuess2("");
//                 setStep(1);
//                 setResult({ type: "", message: null });
//                 setError("");
//                 setHintRevealed1(false);
//                 setHintRevealed2(false);
//             } else {
//                 setError(data.error || "Failed to generate puzzle.");
//             }
//         } catch {
//             setError("Server not reachable.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchPuzzle();
//     }, []);

//     const handleFirstGuess = (e) => {
//         e.preventDefault();
//         if (guess1.toLowerCase() === ladder[1]) {
//             setStep(2);
//             setResult({ type: "", message: null });
//         } else {
//             setResult({
//                 type: "error",
//                 message: <><FaTimesCircle className="inline mr-2" />Incorrect Guess. Try again.</>,
//             });
//         }
//     };

//     const handleSecondGuess = (e) => {
//         e.preventDefault();
//         if (guess2.toLowerCase() === ladder[2]) {
//             setStep(3);
//             setResult({
//                 type: "success",
//                 message: <><FaCheckCircle className="inline mr-2" />Correct! You solved the ladder.</>,
//             });
//         } else {
//             setResult({
//                 type: "error",
//                 message: <><FaTimesCircle className="inline mr-2" />Incorrect Guess. Try again.</>,
//             });
//         }
//     };

//     const handleHint = () => {
//         if (step === 1) {
//             setHintRevealed1(true);
//             setGuess1(ladder[1]);
//             setStep(2);
//             setResult({ type: "", message: null });
//         } else if (step === 2) {
//             setHintRevealed2(true);
//             setGuess2(ladder[2]);
//             setStep(3);
//             setResult({
//                 type: "success",
//                 message: <><FaCheckCircle className="inline mr-2" />Solved using a hint!</>,
//             });
//         }
//     };

//     const handleReset = () => fetchPuzzle();

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-[#fcd34d] via-[#f472b6] to-[#f87171] flex items-center justify-center px-4">
//             <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 1 }}
//                 className="w-full max-w-xl bg-white/90 border border-white/60 rounded-3xl shadow-2xl p-10 backdrop-blur-md text-gray-900"
//             >
//                 <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-pink-600">
//                     <FaSortAlphaDownAlt className="inline m-2 text-yellow-500 animate-bounce" />
//                     Word Ladder
//                     <FaSortAlphaUpAlt className="inline m-2 text-yellow-500 animate-bounce" />
//                 </h1>

//                 {!loading && (
//                     <div className="mb-6 w-full bg-gray-200 rounded-full h-3">
//                         <motion.div
//                             className="h-3 rounded-full bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-400"
//                             animate={{ width: step === 1 ? "33.33%" : step === 2 ? "66.66%" : "100%" }}
//                             transition={{ duration: 0.5 }}
//                         />
//                     </div>
//                 )}

//                 {loading ? (
//                     <p className="text-center text-gray-700">Loading puzzle...</p>
//                 ) : error ? (
//                     <p className="text-red-600 text-center">{error}</p>
//                 ) : (
//                     <>
//                         <div className="flex justify-center gap-3 mb-6 text-lg font-mono">
//                             {[start, step > 1 || hintRevealed1 ? ladder[1] : "____", step > 2 || hintRevealed2 ? ladder[2] : "____", end].map(
//                                 (word, idx) => (
//                                     <motion.span
//                                         key={idx}
//                                         whileHover={{ scale: 1.05 }}
//                                         className={`px-4 py-2 rounded-xl shadow-md transition-all duration-300 ${
//                                             idx === 0 || idx === 3
//                                                 ? "bg-orange-500 text-white"
//                                                 : word !== "____"
//                                                     ? "bg-yellow-300 text-gray-900"
//                                                     : "bg-gray-200 text-gray-500"
//                                         }`}
//                                     >
//                                         {word}
//                                     </motion.span>
//                                 )
//                             )}
//                         </div>

//                         {step === 1 && (
//                             <form onSubmit={handleFirstGuess} className="space-y-4">
//                                 <input
//                                     type="text"
//                                     value={guess1}
//                                     onChange={(e) => {
//                                         setGuess1(e.target.value);
//                                         setResult({ type: "", message: null });
//                                     }}
//                                     placeholder="Guess the first intermediate word"
//                                     className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-xl placeholder-gray-500 focus:ring-4 focus:ring-orange-300 focus:outline-none transition"
//                                 />
//                                 <button
//                                     type="submit"
//                                     className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold py-2 rounded-xl transition"
//                                 >
//                                     <FaSearch className="inline mr-2" /> Submit First Guess
//                                 </button>
//                             </form>
//                         )}

//                         {step === 2 && (
//                             <form onSubmit={handleSecondGuess} className="space-y-4">
//                                 <input
//                                     type="text"
//                                     value={guess2}
//                                     onChange={(e) => {
//                                         setGuess2(e.target.value);
//                                         setResult({ type: "", message: null });
//                                     }}
//                                     placeholder="Guess the second intermediate word"
//                                     className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-xl placeholder-gray-500 focus:ring-4 focus:ring-rose-300 focus:outline-none transition"
//                                 />
//                                 <button
//                                     type="submit"
//                                     className="w-full bg-gradient-to-r from-yellow-500 to-rose-400 text-white font-semibold py-2 rounded-xl transition"
//                                 >
//                                     <FaCheck className="inline mr-2" /> Submit Final Guess
//                                 </button>
//                             </form>
//                         )}

//                         <AnimatePresence>
//                             {result.message && (
//                                 <motion.p
//                                     key="feedback"
//                                     initial={{ opacity: 0, y: -10 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     exit={{ opacity: 0, y: -10 }}
//                                     transition={{ duration: 0.8 }}
//                                     className={`mt-6 text-center text-lg font-bold rounded-xl px-6 py-3 transition duration-300 ${
//                                         result.type === "success"
//                                             ? "bg-green-500 text-white"
//                                             : "bg-red-500 text-white"
//                                     }`}
//                                 >
//                                     {result.message}
//                                 </motion.p>
//                             )}
//                         </AnimatePresence>

//                         <div className="flex gap-4 mt-6">
//                             {step < 3 && (
//                                 <button
//                                     onClick={handleHint}
//                                     className="flex-1 bg-red-400 hover:bg-red-500 text-white py-2 rounded-xl transition"
//                                 >
//                                     <FaLightbulb className="inline mr-2" /> Reveal Hint
//                                 </button>
//                             )}
//                             <button
//                                 onClick={handleReset}
//                                 className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 rounded-xl transition"
//                             >
//                                 <FaSyncAlt className="inline mr-2" /> New Puzzle
//                             </button>
//                         </div>
//                     </>
//                 )}
//             </motion.div>
//         </div>
//     );
// };

// export default WordLadderStrictGame;


// Theme 3

import React, { useEffect, useState } from "react";
import {
    FaSearch,
    FaCheck,
    FaLightbulb,
    FaSyncAlt,
    FaSortAlphaDownAlt,
    FaSortAlphaUpAlt,
    FaTimesCircle,
    FaCheckCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const WordLadderStrictGame = () => {
    const [ladder, setLadder] = useState([]);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [guess1, setGuess1] = useState("");
    const [guess2, setGuess2] = useState("");
    const [step, setStep] = useState(1);
    const [result, setResult] = useState({ type: "", message: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [hintRevealed1, setHintRevealed1] = useState(false);
    const [hintRevealed2, setHintRevealed2] = useState(false);

    const fetchPuzzle = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://127.0.0.1:5000/api/generate");
            const data = await res.json();
            if (res.ok) {
                setLadder(data.ladder);
                setStart(data.start);
                setEnd(data.end);
                setGuess1("");
                setGuess2("");
                setStep(1);
                setResult({ type: "", message: null });
                setError("");
                setHintRevealed1(false);
                setHintRevealed2(false);
            } else {
                setError(data.error || "Failed to generate puzzle.");
            }
        } catch {
            setError("Server not reachable.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPuzzle();
    }, []);

    const handleFirstGuess = (e) => {
        e.preventDefault();
        if (guess1.toLowerCase() === ladder[1]) {
            setStep(2);
            setResult({ type: "", message: null });
        } else {
            setResult({
                type: "error",
                message: <><FaTimesCircle className="inline mr-2" />Incorrect Guess. Try again.</>,
            });
        }
    };

    const handleSecondGuess = (e) => {
        e.preventDefault();
        if (guess2.toLowerCase() === ladder[2]) {
            setStep(3);
            setResult({
                type: "success",
                message: <><FaCheckCircle className="inline mr-2" />Correct! You solved the ladder.</>,
            });
        } else {
            setResult({
                type: "error",
                message: <><FaTimesCircle className="inline mr-2" />Incorrect Guess. Try again.</>,
            });
        }
    };

    const handleHint = () => {
        if (step === 1) {
            setHintRevealed1(true);
            setGuess1(ladder[1]);
            setStep(2);
            setResult({ type: "", message: null });
        } else if (step === 2) {
            setHintRevealed2(true);
            setGuess2(ladder[2]);
            setStep(3);
            setResult({
                type: "success",
                message: <><FaCheckCircle className="inline mr-2" />Solved using a hint!</>,
            });
        }
    };

    const handleReset = () => fetchPuzzle();

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="w-full max-w-xl bg-[#1a1a2e] border border-[#2e2e4e] rounded-3xl shadow-2xl p-10 text-white"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-[#08fdd8]">
                    <FaSortAlphaDownAlt className="inline m-2 text-[#ff2ead] animate-bounce" />
                    Word Ladder
                    <FaSortAlphaUpAlt className="inline m-2 text-[#ff2ead] animate-bounce" />
                </h1>

                {!loading && (
                    <div className="mb-6 w-full bg-[#333] rounded-full h-3">
                        <motion.div
                            className="h-3 rounded-full bg-gradient-to-r from-[#08fdd8] via-[#7209b7] to-[#ff2ead]"
                            animate={{ width: step === 1 ? "33.33%" : step === 2 ? "66.66%" : "100%" }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                )}

                {loading ? (
                    <p className="text-center text-gray-300">Loading puzzle...</p>
                ) : error ? (
                    <p className="text-red-400 text-center">{error}</p>
                ) : (
                    <>
                        <div className="flex justify-center gap-3 mb-6 text-lg font-mono">
                            {[start, step > 1 || hintRevealed1 ? ladder[1] : "____", step > 2 || hintRevealed2 ? ladder[2] : "____", end].map(
                                (word, idx) => (
                                    <motion.span
                                        key={idx}
                                        whileHover={{ scale: 1.05 }}
                                        className={`px-4 py-2 rounded-xl shadow-md transition-all duration-300 ${
                                            idx === 0 || idx === 3
                                                ? "bg-[#3a0ca3] text-white"
                                                : word !== "____"
                                                    ? "bg-[#00f5d4] text-black"
                                                    : "bg-[#2c2c54] text-gray-500"
                                        }`}
                                    >
                                        {word}
                                    </motion.span>
                                )
                            )}
                        </div>

                        {step === 1 && (
                            <form onSubmit={handleFirstGuess} className="space-y-4">
                                <input
                                    type="text"
                                    value={guess1}
                                    onChange={(e) => {
                                        setGuess1(e.target.value);
                                        setResult({ type: "", message: null });
                                    }}
                                    placeholder="Guess the first intermediate word"
                                    className="w-full p-3 bg-[#1f1f2f] text-white border border-cyan-400 rounded-xl placeholder-gray-400 focus:ring-4 focus:ring-[#08fdd8] focus:outline-none transition"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-[#7209b7] to-[#3a0ca3] text-white font-semibold py-2 rounded-xl transition"
                                >
                                    <FaSearch className="inline mr-2" /> Submit First Guess
                                </button>
                            </form>
                        )}

                        {step === 2 && (
                            <form onSubmit={handleSecondGuess} className="space-y-4">
                                <input
                                    type="text"
                                    value={guess2}
                                    onChange={(e) => {
                                        setGuess2(e.target.value);
                                        setResult({ type: "", message: null });
                                    }}
                                    placeholder="Guess the second intermediate word"
                                    className="w-full p-3 bg-[#1f1f2f] text-white border border-pink-500 rounded-xl placeholder-gray-400 focus:ring-4 focus:ring-[#ff2ead] focus:outline-none transition"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-[#ff2ead] to-[#7209b7] text-white font-semibold py-2 rounded-xl transition"
                                >
                                    <FaCheck className="inline mr-2" /> Submit Final Guess
                                </button>
                            </form>
                        )}

                        <AnimatePresence>
                            {result.message && (
                                <motion.p
                                    key="feedback"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.8 }}
                                    className={`mt-6 text-center text-lg font-bold rounded-xl px-6 py-3 transition duration-300 ${
                                        result.type === "success"
                                            ? "bg-green-500 text-white"
                                            : "bg-red-500 text-white"
                                    }`}
                                >
                                    {result.message}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        <div className="flex gap-4 mt-6">
                            {step < 3 && (
                                <button
                                    onClick={handleHint}
                                    className="flex-1 bg-[#f72585] hover:bg-[#b5179e] text-white py-2 rounded-xl transition"
                                >
                                    <FaLightbulb className="inline mr-2" /> Reveal Hint
                                </button>
                            )}
                            <button
                                onClick={handleReset}
                                className="flex-1 bg-[#4cc9f0] hover:bg-[#4895ef] text-black py-2 rounded-xl transition"
                            >
                                <FaSyncAlt className="inline mr-2" /> New Puzzle
                            </button>
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default WordLadderStrictGame;

// Theme 4

// import React, { useEffect, useState } from "react";
// import {
//     FaSearch,
//     FaCheck,
//     FaLightbulb,
//     FaSyncAlt,
//     FaSortAlphaDownAlt,
//     FaSortAlphaUpAlt,
//     FaTimesCircle,
//     FaCheckCircle,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// const WordLadderStrictGame = () => {
//     const [ladder, setLadder] = useState([]);
//     const [start, setStart] = useState("");
//     const [end, setEnd] = useState("");
//     const [guess1, setGuess1] = useState("");
//     const [guess2, setGuess2] = useState("");
//     const [step, setStep] = useState(1);
//     const [result, setResult] = useState({ type: "", message: null });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [hintRevealed1, setHintRevealed1] = useState(false);
//     const [hintRevealed2, setHintRevealed2] = useState(false);

//     const fetchPuzzle = async () => {
//         try {
//             setLoading(true);
//             const res = await fetch("http://127.0.0.1:5000/api/generate");
//             const data = await res.json();
//             if (res.ok) {
//                 setLadder(data.ladder);
//                 setStart(data.start);
//                 setEnd(data.end);
//                 setGuess1("");
//                 setGuess2("");
//                 setStep(1);
//                 setResult({ type: "", message: null });
//                 setError("");
//                 setHintRevealed1(false);
//                 setHintRevealed2(false);
//             } else {
//                 setError(data.error || "Failed to generate puzzle.");
//             }
//         } catch {
//             setError("Server not reachable.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchPuzzle();
//     }, []);

//     const handleFirstGuess = (e) => {
//         e.preventDefault();
//         if (guess1.toLowerCase() === ladder[1]) {
//             setStep(2);
//             setResult({ type: "", message: null });
//         } else {
//             setResult({
//                 type: "error",
//                 message: <><FaTimesCircle className="inline mr-2" />Incorrect Guess. Try again.</>,
//             });
//         }
//     };

//     const handleSecondGuess = (e) => {
//         e.preventDefault();
//         if (guess2.toLowerCase() === ladder[2]) {
//             setStep(3);
//             setResult({
//                 type: "success",
//                 message: <><FaCheckCircle className="inline mr-2" />Correct! You solved the ladder.</>,
//             });
//         } else {
//             setResult({
//                 type: "error",
//                 message: <><FaTimesCircle className="inline mr-2" />Incorrect Guess. Try again.</>,
//             });
//         }
//     };

//     const handleHint = () => {
//         if (step === 1) {
//             setHintRevealed1(true);
//             setGuess1(ladder[1]);
//             setStep(2);
//             setResult({ type: "", message: null });
//         } else if (step === 2) {
//             setHintRevealed2(true);
//             setGuess2(ladder[2]);
//             setStep(3);
//             setResult({
//                 type: "success",
//                 message: <><FaCheckCircle className="inline mr-2" />Solved using a hint!</>,
//             });
//         }
//     };

//     const handleReset = () => fetchPuzzle();

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] flex items-center justify-center px-4">
//             <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 1 }}
//                 className="w-full max-w-xl bg-white text-gray-800 rounded-3xl shadow-2xl p-10"
//             >
//                 <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-[#ff758f]">
//                     <FaSortAlphaDownAlt className="inline m-2 text-[#f48c06]" />
//                     Word Ladder
//                     <FaSortAlphaUpAlt className="inline m-2 text-[#f48c06]" />
//                 </h1>

//                 {!loading && (
//                     <div className="mb-6 w-full bg-gray-200 rounded-full h-3">
//                         <motion.div
//                             className="h-3 rounded-full bg-gradient-to-r from-[#a1c4fd] to-[#c2e9fb]"
//                             animate={{ width: step === 1 ? "33.33%" : step === 2 ? "66.66%" : "100%" }}
//                             transition={{ duration: 0.5 }}
//                         />
//                     </div>
//                 )}

//                 {loading ? (
//                     <p className="text-center text-gray-500">Loading puzzle...</p>
//                 ) : error ? (
//                     <p className="text-red-400 text-center">{error}</p>
//                 ) : (
//                     <>
//                         <div className="flex justify-center gap-3 mb-6 text-lg font-mono">
//                             {[start, step > 1 || hintRevealed1 ? ladder[1] : "____", step > 2 || hintRevealed2 ? ladder[2] : "____", end].map(
//                                 (word, idx) => (
//                                     <motion.span
//                                         key={idx}
//                                         whileHover={{ scale: 1.05 }}
//                                         className={`px-4 py-2 rounded-xl shadow-md transition-all duration-300 ${
//                                             idx === 0 || idx === 3
//                                                 ? "bg-[#ade8f4] text-gray-800"
//                                                 : word !== "____"
//                                                     ? "bg-[#caf0f8] text-gray-700"
//                                                     : "bg-[#f0efeb] text-gray-400"
//                                         }`}
//                                     >
//                                         {word}
//                                     </motion.span>
//                                 )
//                             )}
//                         </div>

//                         {step === 1 && (
//                             <form onSubmit={handleFirstGuess} className="space-y-4">
//                                 <input
//                                     type="text"
//                                     value={guess1}
//                                     onChange={(e) => {
//                                         setGuess1(e.target.value);
//                                         setResult({ type: "", message: null });
//                                     }}
//                                     placeholder="Guess the first intermediate word"
//                                     className="w-full p-3 bg-white text-gray-800 border border-[#bdbdbd] rounded-xl placeholder-gray-500 focus:ring-4 focus:ring-[#a1c4fd] focus:outline-none transition"
//                                 />
//                                 <button
//                                     type="submit"
//                                     className="w-full bg-gradient-to-r from-[#ff9a9e] to-[#fad0c4] text-white font-semibold py-2 rounded-xl transition"
//                                 >
//                                     <FaSearch className="inline mr-2" /> Submit First Guess
//                                 </button>
//                             </form>
//                         )}

//                         {step === 2 && (
//                             <form onSubmit={handleSecondGuess} className="space-y-4">
//                                 <input
//                                     type="text"
//                                     value={guess2}
//                                     onChange={(e) => {
//                                         setGuess2(e.target.value);
//                                         setResult({ type: "", message: null });
//                                     }}
//                                     placeholder="Guess the second intermediate word"
//                                     className="w-full p-3 bg-white text-gray-800 border border-[#bdbdbd] rounded-xl placeholder-gray-500 focus:ring-4 focus:ring-[#ffb4a2] focus:outline-none transition"
//                                 />
//                                 <button
//                                     type="submit"
//                                     className="w-full bg-gradient-to-r from-[#ffb4a2] to-[#fbc4ab] text-white font-semibold py-2 rounded-xl transition"
//                                 >
//                                     <FaCheck className="inline mr-2" /> Submit Final Guess
//                                 </button>
//                             </form>
//                         )}

//                         <AnimatePresence>
//                             {result.message && (
//                                 <motion.p
//                                     key="feedback"
//                                     initial={{ opacity: 0, y: -10 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     exit={{ opacity: 0, y: -10 }}
//                                     transition={{ duration: 0.8 }}
//                                     className={`mt-6 text-center text-lg font-bold rounded-xl px-6 py-3 transition duration-300 ${
//                                         result.type === "success"
//                                             ? "bg-green-400 text-white"
//                                             : "bg-red-400 text-white"
//                                     }`}
//                                 >
//                                     {result.message}
//                                 </motion.p>
//                             )}
//                         </AnimatePresence>

//                         <div className="flex gap-4 mt-6">
//                             {step < 3 && (
//                                 <button
//                                     onClick={handleHint}
//                                     className="flex-1 bg-[#fbc4ab] hover:bg-[#ffb4a2] text-white py-2 rounded-xl transition"
//                                 >
//                                     <FaLightbulb className="inline mr-2" /> Reveal Hint
//                                 </button>
//                             )}
//                             <button
//                                 onClick={handleReset}
//                                 className="flex-1 bg-[#a3c4f3] hover:bg-[#90dbf4] text-white py-2 rounded-xl transition"
//                             >
//                                 <FaSyncAlt className="inline mr-2" /> New Puzzle
//                             </button>
//                         </div>
//                     </>
//                 )}
//             </motion.div>
//         </div>
//     );
// };

// export default WordLadderStrictGame;


// Theme 5

// import React, { useEffect, useState } from "react";
// import {
//     FaSearch,
//     FaCheck,
//     FaLightbulb,
//     FaSyncAlt,
//     FaSortAlphaDownAlt,
//     FaSortAlphaUpAlt,
//     FaTimesCircle,
//     FaCheckCircle,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// const WordLadderStrictGame = () => {
//     const [ladder, setLadder] = useState([]);
//     const [start, setStart] = useState("");
//     const [end, setEnd] = useState("");
//     const [guess1, setGuess1] = useState("");
//     const [guess2, setGuess2] = useState("");
//     const [step, setStep] = useState(1);
//     const [result, setResult] = useState({ type: "", message: null });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [hintRevealed1, setHintRevealed1] = useState(false);
//     const [hintRevealed2, setHintRevealed2] = useState(false);

//     const fetchPuzzle = async () => {
//         try {
//             setLoading(true);
//             const res = await fetch("http://127.0.0.1:5000/api/generate");
//             const data = await res.json();
//             if (res.ok) {
//                 setLadder(data.ladder);
//                 setStart(data.start);
//                 setEnd(data.end);
//                 setGuess1("");
//                 setGuess2("");
//                 setStep(1);
//                 setResult({ type: "", message: null });
//                 setError("");
//                 setHintRevealed1(false);
//                 setHintRevealed2(false);
//             } else {
//                 setError(data.error || "Failed to generate puzzle.");
//             }
//         } catch {
//             setError("Server not reachable.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchPuzzle();
//     }, []);

//     const handleFirstGuess = (e) => {
//         e.preventDefault();
//         if (guess1.toLowerCase() === ladder[1]) {
//             setStep(2);
//             setResult({ type: "", message: null });
//         } else {
//             setResult({
//                 type: "error",
//                 message: <><FaTimesCircle className="inline mr-2" />Incorrect Guess. Try again.</>,
//             });
//         }
//     };

//     const handleSecondGuess = (e) => {
//         e.preventDefault();
//         if (guess2.toLowerCase() === ladder[2]) {
//             setStep(3);
//             setResult({
//                 type: "success",
//                 message: <><FaCheckCircle className="inline mr-2" />Correct! You solved the ladder.</>,
//             });
//         } else {
//             setResult({
//                 type: "error",
//                 message: <><FaTimesCircle className="inline mr-2" />Incorrect Guess. Try again.</>,
//             });
//         }
//     };

//     const handleHint = () => {
//         if (step === 1) {
//             setHintRevealed1(true);
//             setGuess1(ladder[1]);
//             setStep(2);
//             setResult({ type: "", message: null });
//         } else if (step === 2) {
//             setHintRevealed2(true);
//             setGuess2(ladder[2]);
//             setStep(3);
//             setResult({
//                 type: "success",
//                 message: <><FaCheckCircle className="inline mr-2" />Solved using a hint!</>,
//             });
//         }
//     };

//     const handleReset = () => fetchPuzzle();

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-[#000000] to-[#0f0f0f] flex items-center justify-center px-4 font-mono">
//             <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 1 }}
//                 className="w-full max-w-xl bg-[#111] border border-[#0f0] rounded-2xl shadow-xl p-10 text-green-300"
//             >
//                 <h1 className="text-4xl md:text-5xl text-center mb-8 tracking-widest">
//                     <FaSortAlphaDownAlt className="inline mr-2 text-green-400" />
//                     Word Ladder
//                     <FaSortAlphaUpAlt className="inline ml-2 text-green-400" />
//                 </h1>

//                 {!loading && (
//                     <div className="mb-6 w-full bg-[#222] rounded-full h-2">
//                         <motion.div
//                             className="h-2 rounded-full bg-[#0f0]"
//                             animate={{ width: step === 1 ? "33.33%" : step === 2 ? "66.66%" : "100%" }}
//                             transition={{ duration: 0.5 }}
//                         />
//                     </div>
//                 )}

//                 {loading ? (
//                     <p className="text-center text-green-500">Loading puzzle...</p>
//                 ) : error ? (
//                     <p className="text-red-400 text-center">{error}</p>
//                 ) : (
//                     <>
//                         <div className="flex justify-center gap-3 mb-6 text-lg">
//                             {[start, step > 1 || hintRevealed1 ? ladder[1] : "____", step > 2 || hintRevealed2 ? ladder[2] : "____", end].map(
//                                 (word, idx) => (
//                                     <motion.span
//                                         key={idx}
//                                         whileHover={{ scale: 1.05 }}
//                                         className={`px-4 py-2 rounded-lg shadow-sm transition duration-300 ${
//                                             idx === 0 || idx === 3
//                                                 ? "bg-[#006400] text-green-200"
//                                                 : word !== "____"
//                                                     ? "bg-[#0f0] text-black"
//                                                     : "bg-[#222] text-[#555]"
//                                         }`}
//                                     >
//                                         {word}
//                                     </motion.span>
//                                 )
//                             )}
//                         </div>

//                         {step === 1 && (
//                             <form onSubmit={handleFirstGuess} className="space-y-4">
//                                 <input
//                                     type="text"
//                                     value={guess1}
//                                     onChange={(e) => {
//                                         setGuess1(e.target.value);
//                                         setResult({ type: "", message: null });
//                                     }}
//                                     placeholder="First intermediate word"
//                                     className="w-full p-3 bg-black text-[#0f0] border border-[#0f0] rounded-md placeholder-[#3f3] focus:outline-none focus:ring-2 focus:ring-[#0f0]"
//                                 />
//                                 <button
//                                     type="submit"
//                                     className="w-full bg-[#013220] hover:bg-[#025f2f] text-green-200 font-semibold py-2 rounded transition"
//                                 >
//                                     <FaSearch className="inline mr-2" /> Submit First Guess
//                                 </button>
//                             </form>
//                         )}

//                         {step === 2 && (
//                             <form onSubmit={handleSecondGuess} className="space-y-4">
//                                 <input
//                                     type="text"
//                                     value={guess2}
//                                     onChange={(e) => {
//                                         setGuess2(e.target.value);
//                                         setResult({ type: "", message: null });
//                                     }}
//                                     placeholder="Second intermediate word"
//                                     className="w-full p-3 bg-black text-[#0f0] border border-[#0f0] rounded-md placeholder-[#3f3] focus:outline-none focus:ring-2 focus:ring-[#0f0]"
//                                 />
//                                 <button
//                                     type="submit"
//                                     className="w-full bg-[#013220] hover:bg-[#025f2f] text-green-200 font-semibold py-2 rounded transition"
//                                 >
//                                     <FaCheck className="inline mr-2" /> Submit Final Guess
//                                 </button>
//                             </form>
//                         )}

//                         <AnimatePresence>
//                             {result.message && (
//                                 <motion.p
//                                     key="feedback"
//                                     initial={{ opacity: 0, y: -10 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     exit={{ opacity: 0, y: -10 }}
//                                     transition={{ duration: 0.5 }}
//                                     className={`mt-6 text-center text-md font-bold rounded-lg px-6 py-3 ${
//                                         result.type === "success" ? "bg-green-700" : "bg-red-700"
//                                     } text-white`}
//                                 >
//                                     {result.message}
//                                 </motion.p>
//                             )}
//                         </AnimatePresence>

//                         <div className="flex gap-4 mt-6">
//                             {step < 3 && (
//                                 <button
//                                     onClick={handleHint}
//                                     className="flex-1 bg-[#444] hover:bg-[#0f0] text-white py-2 rounded transition"
//                                 >
//                                     <FaLightbulb className="inline mr-2" /> Hint
//                                 </button>
//                             )}
//                             <button
//                                 onClick={handleReset}
//                                 className="flex-1 bg-[#111] hover:bg-[#1a1a1a] border border-[#0f0] text-green-400 py-2 rounded transition"
//                             >
//                                 <FaSyncAlt className="inline mr-2" /> New Puzzle
//                             </button>
//                         </div>
//                     </>
//                 )}
//             </motion.div>
//         </div>
//     );
// };

// export default WordLadderStrictGame;


// Theme 6

// import React, { useEffect, useState } from "react";
// import {
//     FaSearch,
//     FaCheck,
//     FaLightbulb,
//     FaSyncAlt,
//     FaSortAlphaDownAlt,
//     FaSortAlphaUpAlt,
//     FaTimesCircle,
//     FaCheckCircle,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// const WordLadderStrictGame = () => {
//     const [ladder, setLadder] = useState([]);
//     const [start, setStart] = useState("");
//     const [end, setEnd] = useState("");
//     const [guess1, setGuess1] = useState("");
//     const [guess2, setGuess2] = useState("");
//     const [step, setStep] = useState(1);
//     const [result, setResult] = useState({ type: "", message: null });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [hintRevealed1, setHintRevealed1] = useState(false);
//     const [hintRevealed2, setHintRevealed2] = useState(false);

//     const fetchPuzzle = async () => {
//         try {
//             setLoading(true);
//             const res = await fetch("http://127.0.0.1:5000/api/generate");
//             const data = await res.json();
//             if (res.ok) {
//                 setLadder(data.ladder);
//                 setStart(data.start);
//                 setEnd(data.end);
//                 setGuess1("");
//                 setGuess2("");
//                 setStep(1);
//                 setResult({ type: "", message: null });
//                 setError("");
//                 setHintRevealed1(false);
//                 setHintRevealed2(false);
//             } else {
//                 setError(data.error || "Failed to generate puzzle.");
//             }
//         } catch {
//             setError("Server not reachable.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchPuzzle();
//     }, []);

//     const handleFirstGuess = (e) => {
//         e.preventDefault();
//         if (guess1.toLowerCase() === ladder[1]) {
//             setStep(2);
//             setResult({ type: "", message: null });
//         } else {
//             setResult({
//                 type: "error",
//                 message: <><FaTimesCircle className="inline mr-2" />Incorrect Guess. Try again.</>,
//             });
//         }
//     };

//     const handleSecondGuess = (e) => {
//         e.preventDefault();
//         if (guess2.toLowerCase() === ladder[2]) {
//             setStep(3);
//             setResult({
//                 type: "success",
//                 message: <><FaCheckCircle className="inline mr-2" />Correct! You solved the ladder.</>,
//             });
//         } else {
//             setResult({
//                 type: "error",
//                 message: <><FaTimesCircle className="inline mr-2" />Incorrect Guess. Try again.</>,
//             });
//         }
//     };

//     const handleHint = () => {
//         if (step === 1) {
//             setHintRevealed1(true);
//             setGuess1(ladder[1]);
//             setStep(2);
//             setResult({ type: "", message: null });
//         } else if (step === 2) {
//             setHintRevealed2(true);
//             setGuess2(ladder[2]);
//             setStep(3);
//             setResult({
//                 type: "success",
//                 message: <><FaCheckCircle className="inline mr-2" />Solved using a hint!</>,
//             });
//         }
//     };

//     const handleReset = () => fetchPuzzle();

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-[#f2e9e1] to-[#d6ccc2] flex items-center justify-center px-4 font-serif">
//             <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 1 }}
//                 className="w-full max-w-xl bg-[#fdf6e3] text-[#5c3d2e] border border-[#c2b280] rounded-3xl shadow-xl p-10"
//             >
//                 <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 tracking-wider text-[#6f4e37]">
//                     <FaSortAlphaDownAlt className="inline mr-2 text-[#b08968]" />
//                     Word Ladder
//                     <FaSortAlphaUpAlt className="inline ml-2 text-[#b08968]" />
//                 </h1>

//                 {!loading && (
//                     <div className="mb-6 w-full bg-[#eaddcf] rounded-full h-2">
//                         <motion.div
//                             className="h-2 rounded-full bg-[#b08968]"
//                             animate={{ width: step === 1 ? "33.33%" : step === 2 ? "66.66%" : "100%" }}
//                             transition={{ duration: 0.5 }}
//                         />
//                     </div>
//                 )}

//                 {loading ? (
//                     <p className="text-center text-[#a68a64]">Loading puzzle...</p>
//                 ) : error ? (
//                     <p className="text-red-500 text-center">{error}</p>
//                 ) : (
//                     <>
//                         <div className="flex justify-center gap-3 mb-6 text-lg font-mono">
//                             {[start, step > 1 || hintRevealed1 ? ladder[1] : "____", step > 2 || hintRevealed2 ? ladder[2] : "____", end].map(
//                                 (word, idx) => (
//                                     <motion.span
//                                         key={idx}
//                                         whileHover={{ scale: 1.05 }}
//                                         className={`px-4 py-2 rounded-xl shadow transition-all duration-300 ${
//                                             idx === 0 || idx === 3
//                                                 ? "bg-[#b08968] text-white"
//                                                 : word !== "____"
//                                                     ? "bg-[#ddb892] text-white"
//                                                     : "bg-[#eaddcf] text-[#bfae9c]"
//                                         }`}
//                                     >
//                                         {word}
//                                     </motion.span>
//                                 )
//                             )}
//                         </div>

//                         {step === 1 && (
//                             <form onSubmit={handleFirstGuess} className="space-y-4">
//                                 <input
//                                     type="text"
//                                     value={guess1}
//                                     onChange={(e) => {
//                                         setGuess1(e.target.value);
//                                         setResult({ type: "", message: null });
//                                     }}
//                                     placeholder="First intermediate word"
//                                     className="w-full p-3 bg-[#f2e9e1] text-[#5c3d2e] border border-[#c2b280] rounded-lg placeholder-[#bfae9c] focus:outline-none focus:ring-2 focus:ring-[#b08968]"
//                                 />
//                                 <button
//                                     type="submit"
//                                     className="w-full bg-[#a68a64] hover:bg-[#c2b280] text-white font-semibold py-2 rounded-xl transition"
//                                 >
//                                     <FaSearch className="inline mr-2" /> Submit First Guess
//                                 </button>
//                             </form>
//                         )}

//                         {step === 2 && (
//                             <form onSubmit={handleSecondGuess} className="space-y-4">
//                                 <input
//                                     type="text"
//                                     value={guess2}
//                                     onChange={(e) => {
//                                         setGuess2(e.target.value);
//                                         setResult({ type: "", message: null });
//                                     }}
//                                     placeholder="Second intermediate word"
//                                     className="w-full p-3 bg-[#f2e9e1] text-[#5c3d2e] border border-[#c2b280] rounded-lg placeholder-[#bfae9c] focus:outline-none focus:ring-2 focus:ring-[#b08968]"
//                                 />
//                                 <button
//                                     type="submit"
//                                     className="w-full bg-[#a68a64] hover:bg-[#c2b280] text-white font-semibold py-2 rounded-xl transition"
//                                 >
//                                     <FaCheck className="inline mr-2" /> Submit Final Guess
//                                 </button>
//                             </form>
//                         )}

//                         <AnimatePresence>
//                             {result.message && (
//                                 <motion.p
//                                     key="feedback"
//                                     initial={{ opacity: 0, y: -10 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     exit={{ opacity: 0, y: -10 }}
//                                     transition={{ duration: 0.5 }}
//                                     className={`mt-6 text-center text-md font-bold rounded-lg px-6 py-3 ${
//                                         result.type === "success"
//                                             ? "bg-green-400 text-white"
//                                             : "bg-red-400 text-white"
//                                     }`}
//                                 >
//                                     {result.message}
//                                 </motion.p>
//                             )}
//                         </AnimatePresence>

//                         <div className="flex gap-4 mt-6">
//                             {step < 3 && (
//                                 <button
//                                     onClick={handleHint}
//                                     className="flex-1 bg-[#b08968] hover:bg-[#ddb892] text-white py-2 rounded-xl transition"
//                                 >
//                                     <FaLightbulb className="inline mr-2" /> Reveal Hint
//                                 </button>
//                             )}
//                             <button
//                                 onClick={handleReset}
//                                 className="flex-1 bg-[#eaddcf] hover:bg-[#d6ccc2] text-[#5c3d2e] border border-[#b08968] py-2 rounded-xl transition"
//                             >
//                                 <FaSyncAlt className="inline mr-2" /> New Puzzle
//                             </button>
//                         </div>
//                     </>
//                 )}
//             </motion.div>
//         </div>
//     );
// };

// export default WordLadderStrictGame;


// Theme 7

// import React, { useEffect, useState } from "react";
// import {
//     FaSearch,
//     FaCheck,
//     FaLightbulb,
//     FaSyncAlt,
//     FaSortAlphaDownAlt,
//     FaSortAlphaUpAlt,
//     FaTimesCircle,
//     FaCheckCircle,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// const WordLadderStrictGame = () => {
//     const [ladder, setLadder] = useState([]);
//     const [start, setStart] = useState("");
//     const [end, setEnd] = useState("");
//     const [guess1, setGuess1] = useState("");
//     const [guess2, setGuess2] = useState("");
//     const [step, setStep] = useState(1);
//     const [result, setResult] = useState({ type: "", message: null });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [hintRevealed1, setHintRevealed1] = useState(false);
//     const [hintRevealed2, setHintRevealed2] = useState(false);

//     const fetchPuzzle = async () => {
//         try {
//             setLoading(true);
//             const res = await fetch("http://127.0.0.1:5000/api/generate");
//             const data = await res.json();
//             if (res.ok) {
//                 setLadder(data.ladder);
//                 setStart(data.start);
//                 setEnd(data.end);
//                 setGuess1("");
//                 setGuess2("");
//                 setStep(1);
//                 setResult({ type: "", message: null });
//                 setError("");
//                 setHintRevealed1(false);
//                 setHintRevealed2(false);
//             } else {
//                 setError(data.error || "Failed to generate puzzle.");
//             }
//         } catch {
//             setError("Server not reachable.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchPuzzle();
//     }, []);

//     const handleFirstGuess = (e) => {
//         e.preventDefault();
//         if (guess1.toLowerCase() === ladder[1]) {
//             setStep(2);
//             setResult({ type: "", message: null });
//         } else {
//             setResult({
//                 type: "error",
//                 message: <><FaTimesCircle className="inline mr-2" />Incorrect Guess. Try again.</>,
//             });
//         }
//     };

//     const handleSecondGuess = (e) => {
//         e.preventDefault();
//         if (guess2.toLowerCase() === ladder[2]) {
//             setStep(3);
//             setResult({
//                 type: "success",
//                 message: <><FaCheckCircle className="inline mr-2" />Correct! You solved the ladder.</>,
//             });
//         } else {
//             setResult({
//                 type: "error",
//                 message: <><FaTimesCircle className="inline mr-2" />Incorrect Guess. Try again.</>,
//             });
//         }
//     };

//     const handleHint = () => {
//         if (step === 1) {
//             setHintRevealed1(true);
//             setGuess1(ladder[1]);
//             setStep(2);
//             setResult({ type: "", message: null });
//         } else if (step === 2) {
//             setHintRevealed2(true);
//             setGuess2(ladder[2]);
//             setStep(3);
//             setResult({
//                 type: "success",
//                 message: <><FaCheckCircle className="inline mr-2" />Solved using a hint!</>,
//             });
//         }
//     };

//     const handleReset = () => fetchPuzzle();

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-[#ff9a9e] via-[#fad0c4] to-[#fad0c4] flex items-center justify-center px-4 font-sans">
//             <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.8 }}
//                 className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10 text-[#444]"
//             >
//                 <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-pink-600">
//                     <FaSortAlphaDownAlt className="inline mr-2 animate-pulse text-pink-500" />
//                     Word Ladder
//                     <FaSortAlphaUpAlt className="inline ml-2 animate-pulse text-pink-500" />
//                 </h1>

//                 {!loading && (
//                     <div className="mb-6 w-full bg-pink-100 rounded-full h-3">
//                         <motion.div
//                             className="h-3 rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-500 to-rose-400"
//                             animate={{ width: step === 1 ? "33.33%" : step === 2 ? "66.66%" : "100%" }}
//                             transition={{ duration: 0.5 }}
//                         />
//                     </div>
//                 )}

//                 {loading ? (
//                     <p className="text-center text-pink-500">Loading puzzle...</p>
//                 ) : error ? (
//                     <p className="text-red-500 text-center">{error}</p>
//                 ) : (
//                     <>
//                         <div className="flex justify-center gap-3 mb-6 text-lg font-mono">
//                             {[start, step > 1 || hintRevealed1 ? ladder[1] : "____", step > 2 || hintRevealed2 ? ladder[2] : "____", end].map(
//                                 (word, idx) => (
//                                     <motion.span
//                                         key={idx}
//                                         whileHover={{ scale: 1.05 }}
//                                         className={`px-4 py-2 rounded-xl shadow-md transition-all duration-300 ${
//                                             idx === 0 || idx === 3
//                                                 ? "bg-orange-300 text-white"
//                                                 : word !== "____"
//                                                     ? "bg-emerald-300 text-white"
//                                                     : "bg-yellow-100 text-yellow-500"
//                                         }`}
//                                     >
//                                         {word}
//                                     </motion.span>
//                                 )
//                             )}
//                         </div>

//                         {step === 1 && (
//                             <form onSubmit={handleFirstGuess} className="space-y-4">
//                                 <input
//                                     type="text"
//                                     value={guess1}
//                                     onChange={(e) => {
//                                         setGuess1(e.target.value);
//                                         setResult({ type: "", message: null });
//                                     }}
//                                     placeholder="First intermediate word"
//                                     className="w-full p-3 bg-pink-50 text-pink-600 border border-pink-300 rounded-xl placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
//                                 />
//                                 <button
//                                     type="submit"
//                                     className="w-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-semibold py-2 rounded-xl transition"
//                                 >
//                                     <FaSearch className="inline mr-2" /> Submit First Guess
//                                 </button>
//                             </form>
//                         )}

//                         {step === 2 && (
//                             <form onSubmit={handleSecondGuess} className="space-y-4">
//                                 <input
//                                     type="text"
//                                     value={guess2}
//                                     onChange={(e) => {
//                                         setGuess2(e.target.value);
//                                         setResult({ type: "", message: null });
//                                     }}
//                                     placeholder="Second intermediate word"
//                                     className="w-full p-3 bg-blue-50 text-blue-600 border border-blue-300 rounded-xl placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                                 />
//                                 <button
//                                     type="submit"
//                                     className="w-full bg-gradient-to-r from-blue-400 to-sky-400 hover:from-blue-500 hover:to-sky-500 text-white font-semibold py-2 rounded-xl transition"
//                                 >
//                                     <FaCheck className="inline mr-2" /> Submit Final Guess
//                                 </button>
//                             </form>
//                         )}

//                         <AnimatePresence>
//                             {result.message && (
//                                 <motion.p
//                                     key="feedback"
//                                     initial={{ opacity: 0, y: -10 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     exit={{ opacity: 0, y: -10 }}
//                                     transition={{ duration: 0.5 }}
//                                     className={`mt-6 text-center text-md font-bold rounded-lg px-6 py-3 ${
//                                         result.type === "success"
//                                             ? "bg-green-400 text-white"
//                                             : "bg-red-400 text-white"
//                                     }`}
//                                 >
//                                     {result.message}
//                                 </motion.p>
//                             )}
//                         </AnimatePresence>

//                         <div className="flex gap-4 mt-6">
//                             {step < 3 && (
//                                 <button
//                                     onClick={handleHint}
//                                     className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-xl transition"
//                                 >
//                                     <FaLightbulb className="inline mr-2" /> Hint
//                                 </button>
//                             )}
//                             <button
//                                 onClick={handleReset}
//                                 className="flex-1 bg-fuchsia-300 hover:bg-fuchsia-400 text-white py-2 rounded-xl transition"
//                             >
//                                 <FaSyncAlt className="inline mr-2" /> New Puzzle
//                             </button>
//                         </div>
//                     </>
//                 )}
//             </motion.div>
//         </div>
//     );
// };

// export default WordLadderStrictGame;


// Theme 8

// import React, { useEffect, useState } from "react";
// import {
//     FaSearch,
//     FaCheck,
//     FaLightbulb,
//     FaSyncAlt,
//     FaSortAlphaDownAlt,
//     FaSortAlphaUpAlt,
//     FaTimesCircle,
//     FaCheckCircle,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// const WordLadderStrictGame = () => {
//     const [ladder, setLadder] = useState([]);
//     const [start, setStart] = useState("");
//     const [end, setEnd] = useState("");
//     const [guess1, setGuess1] = useState("");
//     const [guess2, setGuess2] = useState("");
//     const [step, setStep] = useState(1);
//     const [result, setResult] = useState({ type: "", message: null });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [hintRevealed1, setHintRevealed1] = useState(false);
//     const [hintRevealed2, setHintRevealed2] = useState(false);

//     const fetchPuzzle = async () => {
//         try {
//             setLoading(true);
//             const res = await fetch("http://127.0.0.1:5000/api/generate");
//             const data = await res.json();
//             if (res.ok) {
//                 setLadder(data.ladder);
//                 setStart(data.start);
//                 setEnd(data.end);
//                 setGuess1("");
//                 setGuess2("");
//                 setStep(1);
//                 setResult({ type: "", message: null });
//                 setError("");
//                 setHintRevealed1(false);
//                 setHintRevealed2(false);
//             } else {
//                 setError(data.error || "Failed to generate puzzle.");
//             }
//         } catch {
//             setError("Server not reachable.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchPuzzle();
//     }, []);

//     const handleFirstGuess = (e) => {
//         e.preventDefault();
//         if (guess1.toLowerCase() === ladder[1]) {
//             setStep(2);
//             setResult({ type: "", message: null });
//         } else {
//             setResult({
//                 type: "error",
//                 message: <><FaTimesCircle className="inline mr-2" />Incorrect Guess. Try again.</>,
//             });
//         }
//     };

//     const handleSecondGuess = (e) => {
//         e.preventDefault();
//         if (guess2.toLowerCase() === ladder[2]) {
//             setStep(3);
//             setResult({
//                 type: "success",
//                 message: <><FaCheckCircle className="inline mr-2" />Correct! You solved the ladder.</>,
//             });
//         } else {
//             setResult({
//                 type: "error",
//                 message: <><FaTimesCircle className="inline mr-2" />Incorrect Guess. Try again.</>,
//             });
//         }
//     };

//     const handleHint = () => {
//         if (step === 1) {
//             setHintRevealed1(true);
//             setGuess1(ladder[1]);
//             setStep(2);
//             setResult({ type: "", message: null });
//         } else if (step === 2) {
//             setHintRevealed2(true);
//             setGuess2(ladder[2]);
//             setStep(3);
//             setResult({
//                 type: "success",
//                 message: <><FaCheckCircle className="inline mr-2" />Solved using a hint!</>,
//             });
//         }
//     };

//     const handleReset = () => fetchPuzzle();

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1f2937] to-[#111827] flex items-center justify-center px-4 font-sans">
//             <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.8 }}
//                 className="w-full max-w-xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-10 text-white"
//             >
//                 <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-cyan-400">
//                     <FaSortAlphaDownAlt className="inline mr-2" />
//                     Word Ladder
//                     <FaSortAlphaUpAlt className="inline ml-2" />
//                 </h1>

//                 {!loading && (
//                     <div className="mb-6 w-full bg-white/10 rounded-full h-2">
//                         <motion.div
//                             className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500"
//                             animate={{ width: step === 1 ? "33.33%" : step === 2 ? "66.66%" : "100%" }}
//                             transition={{ duration: 0.5 }}
//                         />
//                     </div>
//                 )}

//                 {loading ? (
//                     <p className="text-center text-white/70">Loading puzzle...</p>
//                 ) : error ? (
//                     <p className="text-red-400 text-center">{error}</p>
//                 ) : (
//                     <>
//                         <div className="flex justify-center gap-3 mb-6 text-lg font-mono">
//                             {[start, step > 1 || hintRevealed1 ? ladder[1] : "____", step > 2 || hintRevealed2 ? ladder[2] : "____", end].map(
//                                 (word, idx) => (
//                                     <motion.span
//                                         key={idx}
//                                         whileHover={{ scale: 1.05 }}
//                                         className={`px-4 py-2 rounded-xl shadow-md transition-all duration-300 ${
//                                             idx === 0 || idx === 3
//                                                 ? "bg-cyan-600"
//                                                 : word !== "____"
//                                                     ? "bg-teal-600"
//                                                     : "bg-slate-700"
//                                         }`}
//                                     >
//                                         {word}
//                                     </motion.span>
//                                 )
//                             )}
//                         </div>

//                         {step === 1 && (
//                             <form onSubmit={handleFirstGuess} className="space-y-4">
//                                 <input
//                                     type="text"
//                                     value={guess1}
//                                     onChange={(e) => {
//                                         setGuess1(e.target.value);
//                                         setResult({ type: "", message: null });
//                                     }}
//                                     placeholder="First intermediate word"
//                                     className="w-full p-3 bg-white/10 text-white border border-white/20 rounded-xl placeholder-white/50 focus:ring-4 focus:ring-cyan-500 focus:outline-none transition"
//                                 />
//                                 <button
//                                     type="submit"
//                                     className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-2 rounded-xl transition"
//                                 >
//                                     <FaSearch className="inline mr-2" /> Submit First Guess
//                                 </button>
//                             </form>
//                         )}

//                         {step === 2 && (
//                             <form onSubmit={handleSecondGuess} className="space-y-4">
//                                 <input
//                                     type="text"
//                                     value={guess2}
//                                     onChange={(e) => {
//                                         setGuess2(e.target.value);
//                                         setResult({ type: "", message: null });
//                                     }}
//                                     placeholder="Second intermediate word"
//                                     className="w-full p-3 bg-white/10 text-white border border-white/20 rounded-xl placeholder-white/50 focus:ring-4 focus:ring-indigo-500 focus:outline-none transition"
//                                 />
//                                 <button
//                                     type="submit"
//                                     className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2 rounded-xl transition"
//                                 >
//                                     <FaCheck className="inline mr-2" /> Submit Final Guess
//                                 </button>
//                             </form>
//                         )}

//                         <AnimatePresence>
//                             {result.message && (
//                                 <motion.p
//                                     key="feedback"
//                                     initial={{ opacity: 0, y: -10 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     exit={{ opacity: 0, y: -10 }}
//                                     transition={{ duration: 0.5 }}
//                                     className={`mt-6 text-center text-md font-bold rounded-lg px-6 py-3 ${
//                                         result.type === "success"
//                                             ? "bg-green-500 text-white"
//                                             : "bg-red-500 text-white"
//                                     }`}
//                                 >
//                                     {result.message}
//                                 </motion.p>
//                             )}
//                         </AnimatePresence>

//                         <div className="flex gap-4 mt-6">
//                             {step < 3 && (
//                                 <button
//                                     onClick={handleHint}
//                                     className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded-xl transition"
//                                 >
//                                     <FaLightbulb className="inline mr-2" /> Hint
//                                 </button>
//                             )}
//                             <button
//                                 onClick={handleReset}
//                                 className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-xl transition"
//                             >
//                                 <FaSyncAlt className="inline mr-2" /> New Puzzle
//                             </button>
//                         </div>
//                     </>
//                 )}
//             </motion.div>
//         </div>
//     );
// };

// export default WordLadderStrictGame;

// Theme 9

// import React, { useEffect, useState } from "react";
// import {
//     FaSearch,
//     FaCheck,
//     FaLightbulb,
//     FaSyncAlt,
//     FaSortAlphaDownAlt,
//     FaSortAlphaUpAlt,
//     FaTimesCircle,
//     FaCheckCircle,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// const WordLadderStrictGame = () => {
//     const [ladder, setLadder] = useState([]);
//     const [start, setStart] = useState("");
//     const [end, setEnd] = useState("");
//     const [guess1, setGuess1] = useState("");
//     const [guess2, setGuess2] = useState("");
//     const [step, setStep] = useState(1);
//     const [result, setResult] = useState({ type: "", message: null });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [hintRevealed1, setHintRevealed1] = useState(false);
//     const [hintRevealed2, setHintRevealed2] = useState(false);

//     const fetchPuzzle = async () => {
//         try {
//             setLoading(true);
//             const res = await fetch("http://127.0.0.1:5000/api/generate");
//             const data = await res.json();
//             if (res.ok) {
//                 setLadder(data.ladder);
//                 setStart(data.start);
//                 setEnd(data.end);
//                 setGuess1("");
//                 setGuess2("");
//                 setStep(1);
//                 setResult({ type: "", message: null });
//                 setError("");
//                 setHintRevealed1(false);
//                 setHintRevealed2(false);
//             } else {
//                 setError(data.error || "Failed to generate puzzle.");
//             }
//         } catch {
//             setError("Server not reachable.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchPuzzle();
//     }, []);

//     const handleFirstGuess = (e) => {
//         e.preventDefault();
//         if (guess1.toLowerCase() === ladder[1]) {
//             setStep(2);
//             setResult({ type: "", message: null });
//         } else {
//             setResult({
//                 type: "error",
//                 message: <><FaTimesCircle className="inline mr-2" />Wrong Word. Try again!</>,
//             });
//         }
//     };

//     const handleSecondGuess = (e) => {
//         e.preventDefault();
//         if (guess2.toLowerCase() === ladder[2]) {
//             setStep(3);
//             setResult({
//                 type: "success",
//                 message: <><FaCheckCircle className="inline mr-2" />Victory! You did it!</>,
//             });
//         } else {
//             setResult({
//                 type: "error",
//                 message: <><FaTimesCircle className="inline mr-2" />Wrong Word. Try again!</>,
//             });
//         }
//     };

//     const handleHint = () => {
//         if (step === 1) {
//             setHintRevealed1(true);
//             setGuess1(ladder[1]);
//             setStep(2);
//             setResult({ type: "", message: null });
//         } else if (step === 2) {
//             setHintRevealed2(true);
//             setGuess2(ladder[2]);
//             setStep(3);
//             setResult({
//                 type: "success",
//                 message: <><FaCheckCircle className="inline mr-2" />Solved with HINT!</>,
//             });
//         }
//     };

//     const handleReset = () => fetchPuzzle();

//     return (
//         <div className="min-h-screen bg-[#0a0a0a] text-green-400 font-mono flex items-center justify-center px-4">
//             <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.7 }}
//                 className="w-full max-w-2xl bg-[#111] border-4 border-green-400 p-8 rounded-none shadow-xl"
//             >
//                 <h1 className="text-4xl text-center font-bold mb-8 tracking-widest text-pink-400 uppercase">
//                     <FaSortAlphaDownAlt className="inline mr-2" />
//                     Word Ladder Game
//                     <FaSortAlphaUpAlt className="inline ml-2" />
//                 </h1>

//                 {!loading && (
//                     <div className="mb-6 w-full bg-green-800 h-2">
//                         <motion.div
//                             className="h-2 bg-pink-400"
//                             animate={{ width: step === 1 ? "33.33%" : step === 2 ? "66.66%" : "100%" }}
//                             transition={{ duration: 0.4 }}
//                         />
//                     </div>
//                 )}

//                 {loading ? (
//                     <p className="text-center text-pink-300">LOADING...</p>
//                 ) : error ? (
//                     <p className="text-red-400 text-center">{error}</p>
//                 ) : (
//                     <>
//                         <div className="flex justify-center gap-3 mb-6 text-xl">
//                             {[start, step > 1 || hintRevealed1 ? ladder[1] : "____", step > 2 || hintRevealed2 ? ladder[2] : "____", end].map(
//                                 (word, idx) => (
//                                     <motion.div
//                                         key={idx}
//                                         whileHover={{ scale: 1.1 }}
//                                         className={`px-4 py-2 text-black text-center font-bold rounded-none border-2 ${
//                                             idx === 0 || idx === 3
//                                                 ? "bg-green-400 border-pink-300"
//                                                 : word !== "____"
//                                                     ? "bg-yellow-300 border-green-400"
//                                                     : "bg-black text-green-400 border-green-500"
//                                         }`}
//                                     >
//                                         {word}
//                                     </motion.div>
//                                 )
//                             )}
//                         </div>

//                         {step === 1 && (
//                             <form onSubmit={handleFirstGuess} className="space-y-4">
//                                 <input
//                                     type="text"
//                                     value={guess1}
//                                     onChange={(e) => {
//                                         setGuess1(e.target.value);
//                                         setResult({ type: "", message: null });
//                                     }}
//                                     placeholder="Enter first guess"
//                                     className="w-full p-3 bg-black border-2 border-green-400 text-green-300 rounded-none placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
//                                 />
//                                 <button
//                                     type="submit"
//                                     className="w-full bg-pink-500 text-black font-bold py-2 uppercase border-2 border-yellow-300 hover:bg-pink-400"
//                                 >
//                                     <FaSearch className="inline mr-2" /> Submit First
//                                 </button>
//                             </form>
//                         )}

//                         {step === 2 && (
//                             <form onSubmit={handleSecondGuess} className="space-y-4">
//                                 <input
//                                     type="text"
//                                     value={guess2}
//                                     onChange={(e) => {
//                                         setGuess2(e.target.value);
//                                         setResult({ type: "", message: null });
//                                     }}
//                                     placeholder="Enter second guess"
//                                     className="w-full p-3 bg-black border-2 border-cyan-400 text-cyan-300 rounded-none placeholder-cyan-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                                 />
//                                 <button
//                                     type="submit"
//                                     className="w-full bg-cyan-400 text-black font-bold py-2 uppercase border-2 border-pink-300 hover:bg-cyan-300"
//                                 >
//                                     <FaCheck className="inline mr-2" /> Submit Final
//                                 </button>
//                             </form>
//                         )}

//                         <AnimatePresence>
//                             {result.message && (
//                                 <motion.p
//                                     key="feedback"
//                                     initial={{ opacity: 0, y: -10 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     exit={{ opacity: 0, y: -10 }}
//                                     transition={{ duration: 0.5 }}
//                                     className={`mt-6 text-center text-lg font-bold px-4 py-2 border-2 ${
//                                         result.type === "success"
//                                             ? "bg-green-400 text-black border-pink-400"
//                                             : "bg-red-500 text-white border-yellow-300"
//                                     }`}
//                                 >
//                                     {result.message}
//                                 </motion.p>
//                             )}
//                         </AnimatePresence>

//                         <div className="flex gap-4 mt-6">
//                             {step < 3 && (
//                                 <button
//                                     onClick={handleHint}
//                                     className="flex-1 bg-yellow-300 text-black font-bold py-2 border-2 border-pink-400 hover:bg-yellow-200"
//                                 >
//                                     <FaLightbulb className="inline mr-2" /> Hint
//                                 </button>
//                             )}
//                             <button
//                                 onClick={handleReset}
//                                 className="flex-1 bg-black border-2 border-green-400 text-green-300 font-bold py-2 hover:bg-green-900"
//                             >
//                                 <FaSyncAlt className="inline mr-2" /> Reset
//                             </button>
//                         </div>
//                     </>
//                 )}
//             </motion.div>
//         </div>
//     );
// };

// export default WordLadderStrictGame;

// Theme 10

// import React, { useEffect, useState } from "react";
// import {
//     FaSearch,
//     FaCheck,
//     FaLightbulb,
//     FaSyncAlt,
//     FaSortAlphaDownAlt,
//     FaSortAlphaUpAlt,
//     FaTimesCircle,
//     FaCheckCircle,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// const WordLadderStrictGame = () => {
//     const [ladder, setLadder] = useState([]);
//     const [start, setStart] = useState("");
//     const [end, setEnd] = useState("");
//     const [guess1, setGuess1] = useState("");
//     const [guess2, setGuess2] = useState("");
//     const [step, setStep] = useState(1);
//     const [result, setResult] = useState({ type: "", message: null });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [hintRevealed1, setHintRevealed1] = useState(false);
//     const [hintRevealed2, setHintRevealed2] = useState(false);

//     const fetchPuzzle = async () => {
//         try {
//             setLoading(true);
//             const res = await fetch("http://127.0.0.1:5000/api/generate");
//             const data = await res.json();
//             if (res.ok) {
//                 setLadder(data.ladder);
//                 setStart(data.start);
//                 setEnd(data.end);
//                 setGuess1("");
//                 setGuess2("");
//                 setStep(1);
//                 setResult({ type: "", message: null });
//                 setError("");
//                 setHintRevealed1(false);
//                 setHintRevealed2(false);
//             } else {
//                 setError(data.error || "Failed to generate puzzle.");
//             }
//         } catch {
//             setError("Server not reachable.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchPuzzle();
//     }, []);

//     const handleFirstGuess = (e) => {
//         e.preventDefault();
//         if (guess1.toLowerCase() === ladder[1]) {
//             setStep(2);
//             setResult({ type: "", message: null });
//         } else {
//             setResult({
//                 type: "error",
//                 message: <><FaTimesCircle className="inline mr-2" />Incorrect. Try again.</>,
//             });
//         }
//     };

//     const handleSecondGuess = (e) => {
//         e.preventDefault();
//         if (guess2.toLowerCase() === ladder[2]) {
//             setStep(3);
//             setResult({
//                 type: "success",
//                 message: <><FaCheckCircle className="inline mr-2" />You nailed it!</>,
//             });
//         } else {
//             setResult({
//                 type: "error",
//                 message: <><FaTimesCircle className="inline mr-2" />Incorrect. Try again.</>,
//             });
//         }
//     };

//     const handleHint = () => {
//         if (step === 1) {
//             setHintRevealed1(true);
//             setGuess1(ladder[1]);
//             setStep(2);
//             setResult({ type: "", message: null });
//         } else if (step === 2) {
//             setHintRevealed2(true);
//             setGuess2(ladder[2]);
//             setStep(3);
//             setResult({
//                 type: "success",
//                 message: <><FaCheckCircle className="inline mr-2" />Completed with a hint!</>,
//             });
//         }
//     };

//     const handleReset = () => fetchPuzzle();

//     return (
//         <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
//             <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//                 className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
//             >
//                 <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-blue-600 tracking-tight">
//                     <FaSortAlphaDownAlt className="inline mr-2" />
//                     Word Ladder
//                     <FaSortAlphaUpAlt className="inline ml-2" />
//                 </h1>

//                 {!loading && (
//                     <div className="mb-6 w-full bg-gray-200 rounded-full h-3">
//                         <motion.div
//                             className="h-3 bg-blue-500 rounded-full"
//                             animate={{ width: step === 1 ? "33.33%" : step === 2 ? "66.66%" : "100%" }}
//                             transition={{ duration: 0.4 }}
//                         />
//                     </div>
//                 )}

//                 {loading ? (
//                     <p className="text-center text-gray-500">Loading puzzle...</p>
//                 ) : error ? (
//                     <p className="text-red-500 text-center">{error}</p>
//                 ) : (
//                     <>
//                         <div className="flex justify-center gap-3 mb-6 text-lg font-mono">
//                             {[start, step > 1 || hintRevealed1 ? ladder[1] : "____", step > 2 || hintRevealed2 ? ladder[2] : "____", end].map(
//                                 (word, idx) => (
//                                     <motion.span
//                                         key={idx}
//                                         whileHover={{ scale: 1.05 }}
//                                         className={`px-4 py-2 rounded-lg shadow-md transition-all duration-300 font-semibold ${
//                                             idx === 0 || idx === 3
//                                                 ? "bg-blue-500 text-white"
//                                                 : word !== "____"
//                                                     ? "bg-teal-500 text-white"
//                                                     : "bg-gray-100 text-gray-500"
//                                         }`}
//                                     >
//                                         {word}
//                                     </motion.span>
//                                 )
//                             )}
//                         </div>

//                         {step === 1 && (
//                             <form onSubmit={handleFirstGuess} className="space-y-4">
//                                 <input
//                                     type="text"
//                                     value={guess1}
//                                     onChange={(e) => {
//                                         setGuess1(e.target.value);
//                                         setResult({ type: "", message: null });
//                                     }}
//                                     placeholder="First intermediate word"
//                                     className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none"
//                                 />
//                                 <button
//                                     type="submit"
//                                     className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
//                                 >
//                                     <FaSearch className="inline mr-2" /> Submit
//                                 </button>
//                             </form>
//                         )}

//                         {step === 2 && (
//                             <form onSubmit={handleSecondGuess} className="space-y-4">
//                                 <input
//                                     type="text"
//                                     value={guess2}
//                                     onChange={(e) => {
//                                         setGuess2(e.target.value);
//                                         setResult({ type: "", message: null });
//                                     }}
//                                     placeholder="Second intermediate word"
//                                     className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-4 focus:ring-teal-300 focus:outline-none"
//                                 />
//                                 <button
//                                     type="submit"
//                                     className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition"
//                                 >
//                                     <FaCheck className="inline mr-2" /> Submit
//                                 </button>
//                             </form>
//                         )}

//                         <AnimatePresence>
//                             {result.message && (
//                                 <motion.p
//                                     key="feedback"
//                                     initial={{ opacity: 0, y: -10 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     exit={{ opacity: 0, y: -10 }}
//                                     transition={{ duration: 0.4 }}
//                                     className={`mt-6 text-center text-md font-medium px-4 py-3 rounded-lg ${
//                                         result.type === "success"
//                                             ? "bg-green-100 text-green-700"
//                                             : "bg-red-100 text-red-700"
//                                     }`}
//                                 >
//                                     {result.message}
//                                 </motion.p>
//                             )}
//                         </AnimatePresence>

//                         <div className="flex gap-4 mt-6">
//                             {step < 3 && (
//                                 <button
//                                     onClick={handleHint}
//                                     className="flex-1 bg-amber-400 hover:bg-amber-500 text-white py-3 rounded-lg font-semibold transition"
//                                 >
//                                     <FaLightbulb className="inline mr-2" /> Hint
//                                 </button>
//                             )}
//                             <button
//                                 onClick={handleReset}
//                                 className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition"
//                             >
//                                 <FaSyncAlt className="inline mr-2" /> New Puzzle
//                             </button>
//                         </div>
//                     </>
//                 )}
//             </motion.div>
//         </div>
//     );
// };

// export default WordLadderStrictGame;

