"use client";
import NavBar from "@/components/ui/NavBar";
import { Footer } from "@/components/ui/Footer";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Spotlight } from "@/components/ui/Spotlight";
import { motion } from "framer-motion";

export default function IshranaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full relative overflow-hidden bg-gray-50 dark:bg-gray-900">
      <NavBar />
      
      {/* Page content with spotlight effect */}
      <div className="relative w-full min-h-screen pt-16 flex flex-col items-center">
        {/* Spotlight effect */}
        <Spotlight className="hidden md:block" />
        
        {/* Hero section with animation */}
        <motion.div 
          className="w-full relative mb-8 pt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-500 pb-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Tvoj Plan Ishrane
            </motion.h1>
            <motion.p 
              className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Prilagođen tvojim ciljevima i potrebama za optimalne rezultate
            </motion.p>
          </div>
        </motion.div>
        
        {/* Main content with animation */}
        <motion.div 
          className="w-full flex-grow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {children}
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob dark:opacity-5"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000 dark:opacity-5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000 dark:opacity-5"></div>
      </div>
      
      {/* Footer */}
      <div className="mt-20">
        <Footer />
      </div>
      
      {/* Custom animation style */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
