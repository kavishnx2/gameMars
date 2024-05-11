import { motion, AnimatePresence } from "framer-motion";
import { useParams } from 'react-router-dom';
import { ApeRock } from "@/components/ApeRock";

export default function PageApeRock() {
  const { id } = useParams();
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ApeRock id={Number(id)} />
      </motion.div>
    </AnimatePresence>
  );
}
