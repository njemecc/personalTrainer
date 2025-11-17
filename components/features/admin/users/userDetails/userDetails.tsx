"use client";

import { UserSurveyDTO } from "@/types/survey";
import React, { useState, useEffect } from "react";
import { FaFilePdf, FaFileWord, FaDownload, FaPlus, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import DodajPlanIshrane from "../DodajPlanIshrane";
import { getUserNutritionPlans, removeNutritionPlanFromUser } from "@/lib/actions/user.actions";
import DeleteConfirmationDialog from "@/components/features/planIshrane/DeleteConfirmationDialog";

interface UserNutritionPlan {
  planId: string;
  name: string;
  url: string;
  assignedAt: string;
}

const UserDetails = ({
  _id,
  email,
  firstName,
  lastName,
  isActive,
  photo,
  telefon,
  visina,
  tezina,
  datumRodjenja,
  radniStatus,
  brojObroka,
  satiSpavanja,
  tipOsobe,
  zdravstveniProblem,
  dodatno,
  razlogPrestanka,
  imaliTrenera,
  ocekivanja,
  ranijeTrenirali,
}: UserSurveyDTO & { _id: string }) => {
  
  // Debug: Log user ID on component mount
  useEffect(() => {
    console.log("UserDetails component received _id:", _id);
  }, [_id]);
  const [isPlanIshraneModalOpen, setIsPlanIshraneModalOpen] = useState(false);
  const [nutritionPlans, setNutritionPlans] = useState<UserNutritionPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<UserNutritionPlan | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch user's nutrition plans
  const fetchUserNutritionPlans = async () => {
    if (!_id) return;
    
    setIsLoading(true);
    try {
      const plans = await getUserNutritionPlans(_id);
      setNutritionPlans(plans);
    } catch (error) {
      console.error("Greška pri učitavanju planova ishrane korisnika:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserNutritionPlans();
  }, [_id]);

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
    });
  };

  const openDeleteDialog = (plan: UserNutritionPlan) => {
    setPlanToDelete(plan);
    setIsDeleteDialogOpen(true);
  };

  const handleRemovePlan = async () => {
    if (!planToDelete || !_id) return;
    
    setIsDeleting(true);
    try {
      await removeNutritionPlanFromUser(_id, planToDelete.planId);
      setNutritionPlans(prev => prev.filter(plan => plan.planId !== planToDelete.planId));
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Greška pri uklanjanju plana ishrane:", error);
    } finally {
      setIsDeleting(false);
      setPlanToDelete(null);
    }
  };

  // @ts-ignore
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-md">
      <div className="flex justify-center">
        <h2 className="text-xl font-semibold">
          O <span className="text-gold">klijentu</span>
        </h2>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 p-4">
          <img
            src={photo}
            alt="User"
            className="rounded-full w-32 h-32 mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold text-center">
            {firstName} {lastName}
          </h3>
          <p className="text-center">{email}</p>
          <p
            className={`text-center text-[0.9rem] font-bold w-1/2 mx-auto mt-4 text-white py-[0.3rem] rounded ${
              isActive ? "bg-gold" : "bg-red-600"
            }`}
          >
            {isActive ? "Akitvan" : "Neaktivan"}
          </p>
        </div>
        <div className="md:w-2/3 p-4">
          <div className="border-b-2 pb-4">
            <h3 className="text-lg font-semibold">Ostale informacije</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <p>
              <span className="font-semibold">Telefon:</span> {telefon}
            </p>
            <p>
              <span className="font-semibold">Visina:</span> {visina} cm
            </p>
            <p>
              <span className="font-semibold">Težina:</span> {tezina} kg
            </p>
            <p>
              <span className="font-semibold">Datum rodjenja:</span>{" "}
              {new Date(datumRodjenja).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Status zaposlenja:</span>{" "}
              {radniStatus}
            </p>
            <p>
              <span className="font-semibold">Broj obroka u toku dana:</span>{" "}
              {brojObroka}
            </p>
            <p>
              <span className="font-semibold">Broj sati spavanja:</span>{" "}
              {satiSpavanja}
            </p>
            <p>
              <span className="font-semibold">Tip osobe:</span> {tipOsobe}
            </p>
            <p>
              <span className="font-semibold">Zdravstveni problemi:</span>{" "}
              {zdravstveniProblem}
            </p>
            <p>
              <span className="font-semibold">Dodatno:</span> {dodatno}
            </p>
            <p>
              <span className="font-semibold">
                Razlog prestanka sa treningom:
              </span>{" "}
              {razlogPrestanka}
            </p>
            <p>
              <span className="font-semibold">Da li je imao trenera:</span>{" "}
              {imaliTrenera}
            </p>
            <p>
              <span className="font-semibold">Očekivanja od programa:</span>{" "}
              {ocekivanja}
            </p>
            <p>
              <span className="font-semibold">Ranije trenirao:</span>{" "}
              {ranijeTrenirali}
            </p>
          </div>
          
          {/* Planovi ishrane section */}
          <div className="mt-8 border-t-2 pt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Planovi ishrane</h3>
              <button 
                onClick={() => {
                  if (!_id) {
                    alert("Greška: ID korisnika nije dostupan. Osvežite stranicu i pokušajte ponovo.");
                    return;
                  }
                  setIsPlanIshraneModalOpen(true);
                }}
                className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md"
              >
                <FaPlus size={14} />
                <span>Dodaj plan</span>
              </button>
            </div>
            
            <div className="mt-4">
              {isLoading ? (
                <div className="flex justify-center items-center p-6">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
                </div>
              ) : nutritionPlans.length === 0 ? (
                <div className="bg-gray-50 p-4 rounded-md text-center text-gray-500">
                  Klijent nema dodeljenih planova ishrane
                </div>
              ) : (
                <div className="space-y-3">
                  {nutritionPlans.map((plan) => (
                    <motion.div 
                      key={plan.planId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-3 bg-amber-50 rounded-md border border-amber-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {getFileIcon(plan.name)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{plan.name}</p>
                          <p className="text-xs text-gray-500">
                            Dodeljeno: {formatDate(plan.assignedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <a 
                          href={plan.url} 
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition-colors"
                        >
                          <FaDownload size={14} />
                        </a>
                        <button
                          onClick={() => openDeleteDialog(plan)}
                          className="p-2 bg-red-100 text-red-500 rounded-full hover:bg-red-200 transition-colors"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

        <DodajPlanIshrane 
          isOpen={isPlanIshraneModalOpen}
          onClose={() => setIsPlanIshraneModalOpen(false)}
          userId={_id}
          onPlanAdded={fetchUserNutritionPlans}
        />
      
      {/* Dialog za potvrdu brisanja */}
      <DeleteConfirmationDialog 
        isOpen={isDeleteDialogOpen}
        isDeleting={isDeleting}
        title="Uklanjanje plana ishrane"
        description={`Da li ste sigurni da želite da uklonite plan ishrane "${planToDelete?.name}" za ovog klijenta?`}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleRemovePlan}
      />
    </div>
  );
};

export default UserDetails;