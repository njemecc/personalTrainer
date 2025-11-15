
"use client";
import UploadPlanIshrane from "@/components/features/planIshrane/UploadPlanIshrane";
import { useEffect, useState } from "react";
import { FaFilePdf, FaFileWord, FaDownload, FaTrash, FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { createNutritionPlan, deleteNutritionPlan, getAllNutritionPlans } from "@/lib/actions/nutritionPlan.actions";
import DeleteConfirmationDialog from "@/components/features/planIshrane/DeleteConfirmationDialog";

interface NutritionPlan {
    _id: string;
    name: string;
    url: string;
    createdAt: string;
}

const UploadPlanIshranePage = () => {
    const [nutritionPlans, setNutritionPlans] = useState<NutritionPlan[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [planToDelete, setPlanToDelete] = useState<NutritionPlan | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchNutritionPlans = async () => {
            setIsLoading(true);
            try {
                const plans = await getAllNutritionPlans();
                setNutritionPlans(plans);
            } catch (error) {
                console.error("Greška pri učitavanju planova ishrane:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNutritionPlans();
    }, []);

    const handleUploadComplete = async (url: string, fileName: string) => {
        try {
            const newPlan = await createNutritionPlan({ name: fileName, url });
            setNutritionPlans(prev => [newPlan, ...prev]);
        } catch (error) {
            console.error("Greška pri čuvanju plana ishrane:", error);
        }
    };

    const openDeleteDialog = (plan: NutritionPlan) => {
        setPlanToDelete(plan);
        setIsDeleteDialogOpen(true);
    };

    const handleRemove = async () => {
        if (!planToDelete) return;
        
        setIsDeleting(true);
        try {
            await deleteNutritionPlan(planToDelete._id);
            setNutritionPlans(prev => prev.filter(plan => plan._id !== planToDelete._id));
            setIsDeleteDialogOpen(false);
        } catch (error) {
            console.error("Greška pri brisanju plana ishrane:", error);
        } finally {
            setIsDeleting(false);
            setPlanToDelete(null);
        }
    };

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

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-8 max-w-7xl mx-auto"
        >
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <h1 className="text-3xl font-extrabold mb-8 bg-gradient-to-r from-amber-500 to-amber-700 text-transparent bg-clip-text">
                    Upravljanje Planovima Ishrane
                </h1>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <UploadPlanIshrane onUploadComplete={handleUploadComplete} />

                    <motion.div 
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="mt-8 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                                <FaInfoCircle className="text-amber-600 dark:text-amber-500 text-lg" />
                            </div>
                            <h3 className="text-xl font-bold bg-gradient-to-r from-amber-500 to-amber-700 text-transparent bg-clip-text">
                                Važne Napomene
                            </h3>
                        </div>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-gray-800 rounded-lg">
                                <div className="p-1 bg-amber-200 dark:bg-amber-900/50 rounded-full text-amber-700 dark:text-amber-400 mt-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-gray-700 dark:text-gray-300">Maksimalna veličina fajla: <strong className="text-amber-600 dark:text-amber-400">8MB</strong></span>
                            </li>
                            <li className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-gray-800 rounded-lg">
                                <div className="p-1 bg-amber-200 dark:bg-amber-900/50 rounded-full text-amber-700 dark:text-amber-400 mt-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-gray-700 dark:text-gray-300">Formati: <strong className="text-red-500">PDF</strong>, <strong className="text-blue-500">Word</strong></span>
                            </li>
                        </ul>
                    </motion.div>
                </motion.div>

                <motion.div 
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800"
                >
                    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-amber-500 to-amber-700 text-transparent bg-clip-text text-center">
                        Sačuvani Planovi Ishrane
                    </h2>
                    
                    {isLoading ? (
                        <div className="flex justify-center items-center p-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                        </div>
                    ) : nutritionPlans.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-10 bg-amber-50 dark:bg-gray-800 rounded-lg border border-amber-200 dark:border-amber-900/30">
                            <FaInfoCircle className="text-amber-500 text-4xl mb-4" />
                            <p className="text-gray-600 dark:text-gray-400 text-center">
                                Još uvek nema sačuvanih planova ishrane.
                            </p>
                        </div>
                    ) : (
                        <motion.ul 
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="space-y-4 max-h-[500px] overflow-y-auto pr-2"
                        >
                            {nutritionPlans.map((plan) => (
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
                                            <span className="truncate font-medium text-gray-800 dark:text-gray-200">{plan.name}</span>
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
                                                onClick={() => openDeleteDialog(plan)}
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
                    )}
                </motion.div>
            </div>
            
            {/* Dialog za potvrdu brisanja */}
            <DeleteConfirmationDialog 
                isOpen={isDeleteDialogOpen}
                isDeleting={isDeleting}
                title="Brisanje plana ishrane"
                description={`Da li ste sigurni da želite da obrišete plan ishrane "${planToDelete?.name}"? Ova akcija ne može biti poništena.`}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleRemove}
            />
        </motion.div>
    );
};

export default UploadPlanIshranePage;
