"use client";

import { FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const PlanNapomene = () => {
    return (
        <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-10 p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                    <FaInfoCircle className="text-amber-600 dark:text-amber-500 text-xl" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-700 text-transparent bg-clip-text">
                    Važne Napomene
                </h2>
            </div>
            <ul className="space-y-4">
                <li className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-gray-800 rounded-lg">
                    <div className="p-1 bg-amber-200 dark:bg-amber-900/50 rounded-full text-amber-700 dark:text-amber-400 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                        Maksimalna veličina fajla za upload je <strong className="text-amber-600 dark:text-amber-400">8MB</strong>
                    </span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-gray-800 rounded-lg">
                    <div className="p-1 bg-amber-200 dark:bg-amber-900/50 rounded-full text-amber-700 dark:text-amber-400 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                        Podržani formati: <strong className="text-red-500">PDF</strong> (.pdf), <strong className="text-blue-500">Word</strong> (.doc, .docx)
                    </span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-gray-800 rounded-lg">
                    <div className="p-1 bg-amber-200 dark:bg-amber-900/50 rounded-full text-amber-700 dark:text-amber-400 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                        Uploadovani planovi ishrane će biti dostupni klijentima kojima dodelite plan
                    </span>
                </li>
            </ul>
        </motion.div>
    );
};

export default PlanNapomene;
