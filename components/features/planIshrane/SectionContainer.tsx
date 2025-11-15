"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionContainerProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    initialX?: number;
}

const SectionContainer = ({ 
    children, 
    className = "", 
    delay = 0, 
    initialX = 0 
}: SectionContainerProps) => {
    return (
        <motion.div
            initial={{ x: initialX, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay, duration: 0.5 }}
            className={`bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default SectionContainer;
