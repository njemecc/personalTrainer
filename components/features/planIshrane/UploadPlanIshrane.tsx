"use client";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useState, useEffect } from "react";
import {
  FaFilePdf,
  FaFileWord,
  FaFileAlt,
  FaDownload,
  FaTrash,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

interface UploadPlanIshraneProps {
  onUploadComplete?: (url: string, fileName: string) => void;
}

interface UploadedFile {
  url: string;
  name: string;
  type: string;
}

const UploadPlanIshrane = ({ onUploadComplete }: UploadPlanIshraneProps) => {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Simulacija progresa uploada kada je isUploading true
  useEffect(() => {
    if (isUploading) {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          return prev + 5;
        });
      }, 200);

      return () => {
        clearInterval(interval);
        setUploadProgress(0);
      };
    }
  }, [isUploading]);

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("pdf"))
      return <FaFilePdf className="text-red-500 text-3xl" />;
    if (fileType.includes("word") || fileType.includes("msword"))
      return <FaFileWord className="text-blue-500 text-3xl" />;
    return <FaFileAlt className="text-gray-500 text-3xl" />;
  };

  const openDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleRemoveFile = () => {
    setIsDeleteDialogOpen(false);
    setUploadedFile(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-6 w-full max-w-xl p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800"
    >
      <div className="w-full text-center">
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-amber-500 to-amber-700 text-transparent bg-clip-text">
          Upload Plana Ishrane
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          Podržani formati: PDF, Word (.doc, .docx)
        </p>
      </div>

      <div className="w-full">
        {!uploadedFile ? (
          <div className="w-full flex flex-col items-center">
            <div className="w-full p-8 mb-4 border-2 border-dashed border-amber-400 dark:border-amber-600 rounded-lg flex flex-col items-center justify-center bg-amber-50 dark:bg-gray-800">
              <FaCloudUploadAlt className="text-5xl text-amber-500 mb-4" />
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                Izaberite fajl za upload ili prevucite ga ovde
              </p>

              <UploadButton<OurFileRouter, "planIshraneUploader">
                endpoint="planIshraneUploader"
                onBeforeUploadBegin={(files) => {
                  setIsUploading(true);
                  return files;
                }}
                onClientUploadComplete={(res) => {
                  setIsUploading(false);
                  if (res?.[0]) {
                    const file = res[0];
                    setUploadedFile({
                      url: file.ufsUrl || file.url,
                      name: file.name,
                      type: file.type,
                    });
                    if (onUploadComplete) {
                      onUploadComplete(file.ufsUrl || file.url, file.name);
                    }
                  }
                }}
                onUploadError={(error: Error) => {
                  setIsUploading(false);
                  console.error(error);
                  alert(`Greška prilikom uploada: ${error.message}`);
                }}
                className="ut-button:bg-gradient-to-r ut-button:from-amber-500 ut-button:to-amber-700 ut-button:hover:from-amber-600 ut-button:hover:to-amber-800
                                          ut-button:text-white ut-button:px-6 ut-button:py-3 ut-button:rounded-full ut-button:font-medium 
                                          ut-button:shadow-md ut-button:hover:shadow-lg ut-button:transition-all ut-button:duration-300
                                          ut-allowed-content:text-black dark:ut-allowed-content:text-white"
              />
            </div>

            {isUploading && (
              <div className="w-full">
                <div className="h-1 w-full bg-gray-200 rounded-full mb-2">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${uploadProgress}%` }}
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-700 rounded-full"
                  />
                </div>
                <p className="text-sm text-center text-amber-600 dark:text-amber-400">
                  Uploading dokument... {uploadProgress}%
                </p>
              </div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full"
          >
            <div className="p-5 border border-amber-200 dark:border-amber-800 rounded-lg bg-amber-50 dark:bg-gray-800 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white dark:bg-gray-700 rounded-full shadow-sm">
                  {getFileIcon(uploadedFile.type)}
                </div>
                <div className="flex-1 truncate">
                  <p className="font-bold text-gray-800 dark:text-gray-200">
                    {uploadedFile.name}
                  </p>
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    {uploadedFile.type.split("/")[1].toUpperCase()}
                  </p>
                </div>
                <div className="flex gap-3">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href={uploadedFile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-full hover:bg-amber-200 dark:hover:bg-amber-900 transition-colors"
                    title="Preuzmi"
                  >
                    <FaDownload className="text-amber-600 dark:text-amber-400" />
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openDeleteDialog}
                    className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                    title="Ukloni"
                  >
                    <FaTrash className="text-red-500 dark:text-red-400" />
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={openDeleteDialog}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-medium"
              >
                Uploaduj novi dokument
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Dialog za potvrdu brisanja */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        isDeleting={isDeleting}
        title="Uklanjanje dokumenta"
        description={`Da li ste sigurni da želite da uklonite ${uploadedFile?.name}? Možete uploadovati novi dokument nakon toga.`}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleRemoveFile}
      />
    </motion.div>
  );
};

export default UploadPlanIshrane;
