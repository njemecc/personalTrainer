"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilePdf, FaFileWord, FaFileAlt, FaDownload, FaPlus, FaTimes, FaUtensils } from "react-icons/fa";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { createNutritionPlan, getAllNutritionPlans } from "@/lib/actions/nutritionPlan.actions";
import { assignNutritionPlanToUser } from "@/lib/actions/user.actions";

interface NutritionPlan {
  _id: string;
  name: string;
  url: string;
  createdAt: string;
}

interface DodajPlanIshraneProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onPlanAdded?: () => void;
}

const DodajPlanIshrane = ({ isOpen, onClose, userId, onPlanAdded }: DodajPlanIshraneProps) => {
  const [activeTab, setActiveTab] = useState<"existing" | "new">("existing");
  const [nutritionPlans, setNutritionPlans] = useState<NutritionPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch nutrition plans on mount
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

    if (isOpen) {
      fetchNutritionPlans();
    }
  }, [isOpen]);
  
  // Simulate upload progress
  useEffect(() => {
    if (isUploading) {
      const interval = setInterval(() => {
        setUploadProgress(prev => {
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
  
  // Filter plans based on search term
  const filteredPlans = searchTerm
    ? nutritionPlans.filter(plan => 
        plan.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : nutritionPlans;
  
  const handleAssignPlan = async () => {
    if (!selectedPlan) return;
    
    setIsSubmitting(true);
    try {
      await assignNutritionPlanToUser(userId, selectedPlan);
      onPlanAdded?.();
      onClose();
    } catch (error) {
      console.error("Greška pri dodavanju plana ishrane:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const getFileIcon = (fileName: string) => {
    if (fileName.toLowerCase().endsWith('.pdf')) return <FaFilePdf className="text-red-500 text-xl" />;
    if (fileName.toLowerCase().endsWith('.doc') || fileName.toLowerCase().endsWith('.docx')) return <FaFileWord className="text-blue-500 text-xl" />;
    return <FaFileAlt className="text-gray-500 text-xl" />;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('sr-RS', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
    });
  };
  
  // Handle outside click to close modal
  const handleModalContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Handle file upload complete
  const handleUploadComplete = async (url: string, fileName: string) => {
    try {
      const newPlan = await createNutritionPlan({ name: fileName, url });
      setNutritionPlans(prev => [newPlan, ...prev]);
      setSelectedPlan(newPlan._id);
      setActiveTab("existing");
    } catch (error) {
      console.error("Greška pri čuvanju plana ishrane:", error);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={handleModalContainerClick}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl p-6 m-4 bg-white rounded-xl shadow-xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                <FaUtensils className="text-amber-600 dark:text-amber-500 text-xl" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-700 text-transparent bg-clip-text">
                Dodaj Plan Ishrane
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              disabled={isSubmitting}
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
            <button
              className={`py-3 px-6 font-medium text-sm rounded-t-lg transition-colors ${
                activeTab === "existing"
                  ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-b-2 border-amber-500"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("existing")}
            >
              Postojeći Planovi
            </button>
            <button
              className={`py-3 px-6 font-medium text-sm rounded-t-lg transition-colors ${
                activeTab === "new"
                  ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-b-2 border-amber-500"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("new")}
            >
              Dodaj Novi Plan
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2">
            {/* Existing plans tab */}
            {activeTab === "existing" && (
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Pretraži planove ishrane..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pl-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600"
                  />
                </div>
                
                {isLoading ? (
                  <div className="flex justify-center items-center p-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                  </div>
                ) : filteredPlans.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-10 bg-amber-50 dark:bg-gray-800 rounded-lg border border-amber-200 dark:border-amber-900/30">
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      {searchTerm ? "Nema planova ishrane koji odgovaraju pretrazi." : "Još uvek nema sačuvanih planova ishrane."}
                    </p>
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="mt-4 text-amber-600 dark:text-amber-400 hover:underline"
                      >
                        Poništi pretragu
                      </button>
                    )}
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {filteredPlans.map((plan) => (
                      <motion.li 
                        key={plan._id}
                        whileHover={{ scale: 1.01 }}
                        className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-200
                          ${selectedPlan === plan._id
                            ? "border-amber-500 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                        onClick={() => setSelectedPlan(plan._id)}
                      >
                        <div className="flex items-center flex-1 min-w-0">
                          <div className="flex-shrink-0 mr-4">
                            {getFileIcon(plan.name)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="truncate font-medium text-gray-800 dark:text-gray-200">{plan.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Dodato: {formatDate(plan.createdAt)}
                            </p>
                          </div>
                        </div>
                        <a 
                          href={plan.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="p-2 ml-4 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
                          title="Preuzmi"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaDownload />
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            
            {/* New plan tab */}
            {activeTab === "new" && (
              <div className="flex flex-col items-center gap-6 w-full">
                <div className="w-full p-8 border-2 border-dashed border-amber-400 dark:border-amber-600 rounded-lg flex flex-col items-center justify-center bg-amber-50 dark:bg-gray-800">
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
                        handleUploadComplete(file.url, file.name);
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
                
                <div className="bg-amber-50 dark:bg-gray-800 p-4 rounded-lg border border-amber-200 dark:border-amber-900/30 w-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-1 bg-amber-200 dark:bg-amber-900/50 rounded-full text-amber-700 dark:text-amber-400 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Nakon uploada fajla, plan će biti dostupan u sekciji "Postojeći Planovi"
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-1 bg-amber-200 dark:bg-amber-900/50 rounded-full text-amber-700 dark:text-amber-400 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Podržani formati: <strong className="text-red-500">PDF</strong>, <strong className="text-blue-500">Word (.doc, .docx)</strong>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Footer with action buttons */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              disabled={isSubmitting}
            >
              Odustani
            </button>
            <button
              onClick={handleAssignPlan}
              disabled={!selectedPlan || isSubmitting}
              className={`px-6 py-2 rounded-md flex items-center justify-center gap-2 text-white transition
                ${selectedPlan && !isSubmitting
                  ? "bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800"
                  : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Dodavanje...
                </>
              ) : (
                <>
                  <FaPlus className="h-4 w-4" />
                  Dodaj Plan
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DodajPlanIshrane;
