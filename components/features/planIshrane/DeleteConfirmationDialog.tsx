"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash } from "react-icons/fa";

interface DeleteConfirmationDialogProps {
    isOpen: boolean;
    title: string;
    description: string;
    isDeleting: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
    isOpen,
    title,
    description,
    isDeleting,
    onClose,
    onConfirm
}) => {
    if (!isOpen) return null;

    // Sprečavanje propagacije klika sa popup-a na overlay
    const handleDialogClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 20, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-md p-6 m-4 bg-white rounded-xl shadow-xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                        onClick={handleDialogClick}
                    >
                        {/* Dugme za zatvaranje */}
                        <button
                            onClick={onClose}
                            className="absolute p-1 rounded-full top-4 right-4 opacity-70 hover:opacity-100 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                            disabled={isDeleting}
                        >
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Sadržaj */}
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-red-500 dark:text-red-400 mb-2">
                                {title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {description}
                            </p>
                        </div>

                        {/* Dugmad */}
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                disabled={isDeleting}
                            >
                                Odustani
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 transition flex items-center justify-center gap-2"
                                disabled={isDeleting}
                            >
                                {isDeleting ? (
                                    <>
                                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                        Brisanje...
                                    </>
                                ) : (
                                    <>
                                        <FaTrash className="h-4 w-4" />
                                        Obriši
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DeleteConfirmationDialog;
