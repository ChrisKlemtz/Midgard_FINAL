import React from "react";
import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div style={{ padding: "60px 0", background: "#1a1a1a" }}>
      <motion.div
        style={{
          position: "relative",
          height: "2px",
          width: "80%",
          maxWidth: "1200px",
          margin: "0 auto",
          background: "linear-gradient(90deg, transparent 0%, #d4af37 50%, transparent 100%)",
          boxShadow: "0 0 20px rgba(212, 175, 55, 0.6), 0 0 40px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.2)",
        }}
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: "-1px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: "4px",
            background: "radial-gradient(ellipse at center, rgba(244, 229, 194, 0.8) 0%, rgba(212, 175, 55, 0.4) 40%, transparent 70%)",
            filter: "blur(4px)",
          }}
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
}
