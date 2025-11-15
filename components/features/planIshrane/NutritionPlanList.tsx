"use client";

import { useState } from "react";
import { FaFilePdf, FaFileWord, FaDownload, FaTrash, FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { deleteNutritionPlan } from "@/lib/actions/nutritionPlan.actions";

interface NutritionPlan {
    _id: string;
    name: string;
    url: string;
    createdAt: string;
}

interface NutritionPlanListProps {
    plans: NutritionPlan[];
    isLoading: boolean;
    onRemove: (id: string) => void;
}

const NutritionPlanList = ({ plans, isLoading, onRemove }: NutritionPlanListProps) => {
    const getFileIcon = (fileName: string) => {
        if (fileName.toLowerCase().endsWith('.pdf')) return <FaFilePdf className="text-red-500 text-xl" />;
        if (fileName.toLowerCase().endsWith('.doc') || fileName.toLowerCase().endsWith('.docx')) return <FaFileWord className="text-blue-500 text-xl" />;
        return null;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('sr-RS', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleRemove = async (id: string) => {
        try {
            await deleteNutritionPlan(id);
            onRemove(id);
        } catch (error) {
            console.error("Greška pri brisanju plana ishrane:", error);
        }
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
        );
    }

    if (plans.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-10 bg-amber-50 dark:bg-gray-800 rounded-lg border border-amber-200 dark:border-amber-900/30">
                <FaInfoCircle className="text-amber-500 text-4xl mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-center">
                    Još uvek nema sačuvanih planova ishrane.
                </p>
            </div>
        );
    }

    return (
        <motion.ul 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4 max-h-[500px] overflow-y-auto pr-2"
        >
            {plans.map((plan) => (
                <motion.li 
                    key={plan._id} 
                    variants={item}
                    className="flex flex-col p-4 bg-amber-50 dark:bg-gray-800 rounded-lg border border-amber-200 dark:border-amber-900/30 hover:shadow-md transition-all duration-300"
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="flex-shrink-0">
                                {getFileIcon(plan.name)}
                            </div>
                            <span className="truncate font-medium text-gray-800 dark:text-gray-200">
                                {plan.name}
                            </span>
                        </div>
                        <div className="flex gap-2 ml-4">
                            <motion.a 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                href={plan.url} 
                                target="_blank" 
                                rel="noreferrer"
                                className="p-2 bg-amber-200 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 rounded-full hover:bg-amber-300 dark:hover:bg-amber-900 transition-colors"
                                title="Preuzmi"
                            >
                                <FaDownload />
                            </motion.a>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleRemove(plan._id)}
                                className="p-2 bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 rounded-full hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                                title="Ukloni"
                            >
                                <FaTrash />
                            </motion.button>
                        </div>
                    </div>
                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Dodato: {formatDate(plan.createdAt)}
                    </div>
                </motion.li>
            ))}
        </motion.ul>
    );
};

export default NutritionPlanList;
