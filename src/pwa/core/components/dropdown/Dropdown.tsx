import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const dropdownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
    pointerEvents: "none",
    transition: { duration: 0.15, ease: "easeInOut" },
  },
  visible: {
    opacity: 1,
    y: 0,
    pointerEvents: "auto",
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

export default function NeomorphicDropdown({
  options,
  placeholder = "JLPT N5",
}: {
  options: string[];
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-fit px-4 py-3 text-left rounded-2xl 
          bg-[var(--color-neutral-850)] text-[var(--color-neutral-200)] 
          shadow-[inset_2px_2px_5px_#1a1a1a,inset_-2px_-2px_5px_#2c2c2c] 
          focus:outline-none"
      >
        {selected || placeholder}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
            className="absolute z-10 w-full mt-2 rounded-2xl 
              bg-[var(--color-neutral-850)] text-[var(--color-neutral-200)] 
              shadow-[4px_4px_10px_#1a1a1a,-4px_-4px_10px_#2c2c2c] 
              overflow-hidden"
          >
            {options.map((opt, idx) => (
              <li
                key={idx}
                onClick={() => {
                  setSelected(opt);
                  setIsOpen(false);
                }}
                className="px-4 py-2 cursor-pointer hover:bg-[var(--color-neutral-700)]"
              >
                {opt}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
