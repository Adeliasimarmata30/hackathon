import { motion } from "framer-motion";

export default function Logo() {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer"
    >
      <h1 className="text-2xl font-extrabold tracking-wide text-white">
        TOBA
        <span className="text-cyan-300"> INFINITY</span>
      </h1>

      <p className="text-xs text-slate-300">
        AI Smart Tourism Platform
      </p>
    </motion.div>
  );
}