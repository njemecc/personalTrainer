"use client";

import { motion } from "framer-motion";

interface PageTitleProps {
    title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-3xl font-extrabold mb-8 bg-gradient-to-r from-amber-500 to-amber-700 text-transparent bg-clip-text">
                {title}
            </h1>
        </motion.div>
    );
};

export default PageTitle;
