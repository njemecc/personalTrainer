"use client";

import { ReactNode } from "react";

interface SectionTitleProps {
    title: string;
    icon?: ReactNode;
}

const SectionTitle = ({ title, icon }: SectionTitleProps) => {
    return (
        <div className="flex items-center gap-3 mb-6">
            {icon && (
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                    {icon}
                </div>
            )}
            <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-700 text-transparent bg-clip-text">
                {title}
            </h2>
        </div>
    );
};

export default SectionTitle;
