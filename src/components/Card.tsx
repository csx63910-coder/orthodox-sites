import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";
import { cn } from "../utils/cn";

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export default function Card({ className, children }: CardProps) {
  return (
    <motion.article
      whileHover={{ y: -6, boxShadow: "0 16px 30px rgba(0,0,0,0.25)" }}
      transition={{ duration: 0.25 }}
      className={cn(
        "rounded-xl border p-5",
        "bg-[var(--card)] border-[var(--border)]/60",
        "shadow-sm shadow-black/25",
        className
      )}
    >
      {children}
    </motion.article>
  );
}