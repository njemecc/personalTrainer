"use client";

import { useState, useEffect } from "react";
import {
  AlertTriangle,
  Download,
  Utensils,
  ChevronLeft,
  ChevronRight,
  Maximize,
  ZoomIn,
  ZoomOut,
  RotateCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

// Configure pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

type NutritionPlan = {
  _id?: string;
  name: string;
  url: string;
  assignedAt?: Date | string;
};

interface UserNutritionProps {
  userId: string;
  nutritionPlans: NutritionPlan[] | null;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

function UserNutrition({ userId, nutritionPlans }: UserNutritionProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isPdfLoaded, setIsPdfLoaded] = useState(false);
  const [useIframe, setUseIframe] = useState(false);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);

  // Odredi trenutno selektovani plan
  const currentPlan =
    nutritionPlans && nutritionPlans.length > 0
      ? nutritionPlans[selectedPlanIndex]
      : null;

  // Reset when nutrition plan changes
  useEffect(() => {
    if (currentPlan) {
      setError(null);
      setIsLoading(true);
      setIsPdfLoaded(false);
      setUseIframe(false);
      setPageNumber(1);
      setScale(1);
      setRotation(0);

      if (!currentPlan.url) {
        setError("URL plana ishrane nije dostupan.");
        setIsLoading(false);
      }
    }
  }, [currentPlan]);

  // Handle document loading functions
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setIsLoading(false);
    setIsPdfLoaded(true);
  }

  function onDocumentLoadError(error: Error) {
    console.error("Greška pri učitavanju PDF-a:", error);
    // Pokušaj sa iframe-om umesto react-pdf
    setUseIframe(true);
    setError(null);
    setIsLoading(true);
  }

  // Page navigation functions
  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    if (numPages) {
      setPageNumber((prev) => Math.min(prev + 1, numPages));
    }
  };

  // Zoom functions
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.6));
  const rotate = () => setRotation((prev) => (prev + 90) % 360);

  if (!nutritionPlans || nutritionPlans.length === 0) {
    return (
      <motion.div
        className="w-full max-w-5xl mx-auto py-10 px-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl text-center"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative">
              <Utensils className="h-16 w-16 text-gray-300 dark:text-gray-600" />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.3 }}
              >
                <span className="animate-ping absolute h-3 w-3 rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative rounded-full h-2 w-2 bg-gold"></span>
              </motion.div>
            </div>
          </motion.div>

          <motion.h2
            className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 bg-clip-text text-transparent bg-gradient-to-r from-gold-600 to-amber-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Plan ishrane je u pripremi
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            ⏳ Tvoj personalizovani plan ishrane je još uvek u procesu izrade.
          </motion.p>

          <motion.p
            className="text-base font-semibold text-primary max-w-md mx-auto mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Plan ishrane će biti dostupan za najkasnije 24 sata.
          </motion.p>

          <motion.div
            className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Naš tim stručnjaka prilagođava plan ishrane prema tvojim
              specifičnim potrebama i ciljevima.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Plan Selector */}
      {nutritionPlans && nutritionPlans.length > 1 && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Dostupni planovi ishrane:
            </h3>
            <span className="text-sm font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full">
              {nutritionPlans.length}{" "}
              {nutritionPlans.length === 1
                ? "plan"
                : nutritionPlans.length >= 2 && nutritionPlans.length <= 4
                  ? "plana"
                  : "planova"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {nutritionPlans.map((plan, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedPlanIndex(index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedPlanIndex === index
                    ? "bg-gold text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {plan.name}
                {plan.assignedAt && (
                  <span className="ml-2 text-xs opacity-75">
                    (
                    {new Date(plan.assignedAt).toLocaleDateString("sr-RS", {
                      month: "short",
                      year: "numeric",
                    })}
                    )
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      <motion.h2
        className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200"
        {...fadeInUp}
        transition={{ duration: 0.5 }}
      >
        {currentPlan?.name}
      </motion.h2>

      <motion.div
        className="mb-4 flex justify-end"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <motion.a
          href={currentPlan?.url}
          download={currentPlan?.name}
          className="inline-flex items-center px-5 py-2.5 bg-gray-900 dark:bg-gray-800 text-white rounded-full hover:bg-gray-800 dark:hover:bg-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium shadow-md"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Download className="h-5 w-5 mr-2" />
          Preuzmi plan ishrane
        </motion.a>
      </motion.div>

      <motion.div
        className="border rounded-xl overflow-hidden bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {error ? (
          <motion.div
            className="p-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Dokument nije moguće prikazati
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              PDF dokument se ne može prikazati direktno u pretraživaču. Molimo
              koristite opcije ispod za pristup dokumentu.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.a
                href={currentPlan?.url}
                download={currentPlan?.name}
                className="inline-flex items-center px-5 py-2.5 bg-gray-900 dark:bg-gray-800 text-white rounded-full hover:bg-gray-800 dark:hover:bg-gray-700 hover:shadow-lg transition-all duration-300 font-medium shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="h-5 w-5 mr-2" />
                Preuzmi dokument
              </motion.a>
              <motion.button
                className="px-5 py-2.5 bg-gray-900 dark:bg-gray-800 text-white rounded-full hover:bg-gray-800 dark:hover:bg-gray-700 hover:shadow-lg transition-all duration-300 font-medium shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open(currentPlan?.url, "_blank")}
              >
                Otvori u novom prozoru
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <>
            {/* PDF Controls */}
            {isPdfLoaded && (
              <motion.div
                className="flex justify-between items-center p-3 border-b dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Page Navigation */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={goToPrevPage}
                    disabled={pageNumber <= 1}
                    className={`p-2 rounded-full ${pageNumber <= 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <span className="text-sm font-medium">
                    Strana {pageNumber} od {numPages}
                  </span>

                  <button
                    onClick={goToNextPage}
                    disabled={numPages !== null && pageNumber >= numPages}
                    className={`p-2 rounded-full ${numPages !== null && pageNumber >= numPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
                    aria-label="Next page"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={zoomOut}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    aria-label="Zoom out"
                  >
                    <ZoomOut className="h-5 w-5" />
                  </button>

                  <span className="text-sm font-medium">
                    {Math.round(scale * 100)}%
                  </span>

                  <button
                    onClick={zoomIn}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    aria-label="Zoom in"
                  >
                    <ZoomIn className="h-5 w-5" />
                  </button>

                  <button
                    onClick={rotate}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ml-2"
                    aria-label="Rotate"
                  >
                    <RotateCw className="h-5 w-5" />
                  </button>

                  <button
                    onClick={() => window.open(currentPlan?.url, "_blank")}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ml-2"
                    aria-label="Open in full screen"
                  >
                    <Maximize className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            )}

            <div className="pdf-container h-[500px] md:h-[800px] relative overflow-auto flex justify-center">
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    className="absolute inset-0 flex flex-col justify-center items-center z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="relative">
                      <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-gold animate-spin"></div>
                      <div
                        className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-4 border-b-4 border-amber-500 animate-spin opacity-70"
                        style={{
                          animationDirection: "reverse",
                          animationDuration: "1.5s",
                        }}
                      ></div>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 text-center px-4 mt-4">
                      Učitavanje dokumenta...
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* PDF Document Viewer - pokušaj prvo sa react-pdf, pa iframe kao fallback */}
              {!useIframe ? (
                <Document
                  file={currentPlan?.url}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={null}
                  className="pdf-document"
                >
                  <Page
                    pageNumber={pageNumber}
                    scale={scale}
                    rotate={rotation}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    className={`${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
                    loading={null}
                  />
                </Document>
              ) : (
                <motion.iframe
                  src={currentPlan?.url}
                  className="w-full h-full border-0 min-h-[500px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  onLoad={() => {
                    setIsLoading(false);
                    setIsPdfLoaded(true);
                  }}
                  onError={() => {
                    // Ako direktni iframe ne radi, pokušaj sa Google Docs viewerom
                    setError(
                      "Nije moguće prikazati dokument. Molimo koristite opcije za preuzimanje."
                    );
                    setIsLoading(false);
                  }}
                  title="Nutrition Plan Viewer"
                />
              )}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export default UserNutrition;
