import React from "react";
import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div style={{ padding: "100px 20px", background: "transparent", overflow: "hidden", width: "100%", maxWidth: "100vw" }}>
      <motion.div
        style={{
          position: "relative",
          height: "2px",
          width: "80%",
          maxWidth: "1200px",
          margin: "0 auto",
          background: "linear-gradient(90deg, transparent 0%, #d4af37 50%, transparent 100%)",
          boxShadow: "none",
        }}
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
      </motion.div>
    </div>
  );
}
