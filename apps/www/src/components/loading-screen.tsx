import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function Logo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="w-40 h-40 bg-white rounded-3xl shadow-lg flex items-center justify-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.span
        className="text-5xl font-bold text-purple-600 italic"
        initial={{ y: 30, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
      >
        scrapi
      </motion.span>
    </motion.div>
  );
}

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gray-100 flex flex-col items-center justify-center">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 360],
          boxShadow: [
            "0 0 10px rgba(128, 0, 128, 0.2)",
            "0 0 20px rgba(128, 0, 128, 0.4)",
            "0 0 10px rgba(128, 0, 128, 0.2)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="p-6 rounded-full"
      >
        <Logo />
      </motion.div>
      <motion.h2
        className="text-2xl font-semibold mt-8 text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Fetching Content
      </motion.h2>
      <motion.p
        className="text-gray-600 mt-2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 1.5,
          delay: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Please wait while we scrape and process the URL...
      </motion.p>
    </div>
  );
}
