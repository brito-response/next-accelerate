export const formLoginWrapperTemplate = () => `
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FormLogin } from ".";
import { XIcon } from "lucide-react";
import { hiddenPaths } from "./hidenpath";
import { ButtonGeneric } from "@/components/ButtonGeneric";

export const FormLoginWrapper = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isHidden = hiddenPaths.some((path) => pathname.startsWith(path));

  // If the route is protected → only the FormLogin itself is rendered (which displays the "Log Out" button).
  if (isHidden) {
    return <FormLogin />;
  }

  return (
    <>
      {/* Mobile & Tablets (<lg): displays normal form */}
      <div className="bg-(--bg-color) block md:hidden">
        <FormLogin />
      </div>

      {/* Desktop (lg:): button + modal */}
      <div className="hidden md:flex">
        <ButtonGeneric label="Login" onClick={() => setOpen(true)} />
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-999" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-(--bg-color) rounded-2xl p-6 w-105 shadow-xl relative" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ type: "spring", stiffness: 120 }}>
              {/* Botão fechar */}
              <button onClick={() => setOpen(false)} className="absolute right-4 top-4 text-gray-600 hover:text-black text-xl">
                <XIcon />
              </button>

              <h2 className="text-lg font-semibold mb-4">Login</h2>

              {/* Form within the modal */}
              <FormLogin />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

`;