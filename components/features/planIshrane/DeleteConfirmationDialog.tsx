"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  isDeleting: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationDialog = ({
  isOpen,
  isDeleting,
  title,
  description,
  onClose,
  onConfirm,
}: DeleteConfirmationDialogProps) => {
  if (!isOpen) return null;

  // Sprečavanje propagacije klika sa popup-a na overlay
  const handleDialogClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Dialog Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-md rounded-xl bg-white dark:bg-gray-900 p-6 shadow-xl relative z-50 border border-amber-200 dark:border-amber-900/30 m-4"
            onClick={handleDialogClick}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              disabled={isDeleting}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">Close</span>
            </button>
            
            {/* Header */}
            <div className="flex flex-col items-center gap-2 mb-6 pt-3">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full text-red-500 dark:text-red-400 mb-2"
              >
                <FaExclamationTriangle size={24} />
              </motion.div>
              <h2 className="text-xl font-bold text-center text-gray-800 dark:text-gray-200">
                {title}
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400 max-w-sm">
                {description}
              </p>
            </div>
            
            {/* Footer */}
            <div className="flex sm:flex-row gap-3 justify-center mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md border border-amber-200 dark:border-amber-900/30 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-colors"
                disabled={isDeleting}
              >
                Otkaži
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white transition-colors flex items-center justify-center"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-white"></span>
                    Brisanje...
                  </>
                ) : (
                  "Obriši"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmationDialog;
