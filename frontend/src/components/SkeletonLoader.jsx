import React from "react";
import { motion } from "framer-motion";

export default function SkeletonLoader({ count = 6 }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 30,
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          style={{
            background: "#1b1816",
            borderRadius: 16,
            overflow: "hidden",
            height: 400,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          {/* Image Skeleton */}
          <div
            style={{
              width: "100%",
              height: 250,
              background: "linear-gradient(90deg, #1b1816 0%, #2a2623 50%, #1b1816 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite",
            }}
          />

          {/* Content Skeleton */}
          <div style={{ padding: 25 }}>
            {/* Category Badge */}
            <div
              style={{
                width: "40%",
                height: 24,
                background: "linear-gradient(135deg, #f4e5c2 0%, #d4af37 25%, #f4e5c2 50%, #d4af37 75%, #f4e5c2 100%)",
                backgroundSize: "200% 200%",
                animation: "goldShimmer 3s linear infinite",
                borderRadius: 6,
                marginBottom: 15,
              }}
            />

            {/* Title Skeleton */}
            <div
              style={{
                width: "80%",
                height: 20,
                background: "linear-gradient(90deg, #2a2623 0%, #3a3633 50%, #2a2623 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
                borderRadius: 4,
                marginBottom: 12,
              }}
            />

            {/* Description Lines */}
            <div
              style={{
                width: "100%",
                height: 16,
                background: "linear-gradient(90deg, #2a2623 0%, #3a3633 50%, #2a2623 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
                borderRadius: 4,
                marginBottom: 8,
              }}
            />
            <div
              style={{
                width: "60%",
                height: 16,
                background: "linear-gradient(90deg, #2a2623 0%, #3a3633 50%, #2a2623 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
                borderRadius: 4,
              }}
            />
          </div>
        </motion.div>
      ))}

      <style>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
}
