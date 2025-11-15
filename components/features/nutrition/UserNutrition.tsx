"use client";

import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Loader2 } from "lucide-react";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Configure worker for pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface UserNutritionProps {
  userId: string;
  nutritionPlan: {
    _id: string;
    name: string;
    url: string;
  } | null;
}

const UserNutrition: React.FC<UserNutritionProps> = ({ userId, nutritionPlan }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setIsLoading(false);
  }

  function changePage(offset: number) {
    setPageNumber(prevPageNumber => Math.min(Math.max(prevPageNumber + offset, 1), numPages || 1));
  }

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  if (!nutritionPlan) {
    return (
      <div className="w-full max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
          Plan Ishrane
        </h2>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400">
          ⏳ Tvoj plan ishrane je još uvek u procesu izrade.
        </p>
      </div>
    );
  }

  const isPdf = nutritionPlan.url.toLowerCase().endsWith('.pdf');
  
  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
        Plan Ishrane: {nutritionPlan.name}
      </h2>
      
      <div className="mb-4 flex justify-end">
        <a
          href={nutritionPlan.url}
          download={`${nutritionPlan.name}.${isPdf ? 'pdf' : 'docx'}`}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Preuzmi plan ishrane
        </a>
      </div>

      <div className="mt-6 border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-700">
        {isPdf ? (
          <div className="pdf-container">
            {isLoading && (
              <div className="flex justify-center items-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600 dark:text-gray-400">Učitavanje dokumenta...</span>
              </div>
            )}
            
            <Document
              file={nutritionPlan.url}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(error) => console.error("Error loading PDF:", error)}
              loading={
                <div className="flex justify-center items-center h-96">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
              }
              className="mx-auto"
            >
              <Page 
                pageNumber={pageNumber} 
                renderTextLayer={true}
                renderAnnotationLayer={true}
                scale={1.2}
                className="mx-auto"
              />
            </Document>

            {numPages && (
              <div className="flex justify-between items-center p-4 border-t">
                <button
                  onClick={previousPage}
                  disabled={pageNumber <= 1}
                  className={`px-3 py-1 rounded ${
                    pageNumber <= 1
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Prethodna
                </button>
                
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Strana {pageNumber} od {numPages}
                </p>
                
                <button
                  onClick={nextPage}
                  disabled={pageNumber >= (numPages || 1)}
                  className={`px-3 py-1 rounded ${
                    pageNumber >= (numPages || 1)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Sledeća
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Ovaj dokument nije u PDF formatu i ne može biti prikazan direktno u pretraživaču.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Molimo preuzmite dokument koristeći dugme iznad da biste ga otvorili.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNutrition;
