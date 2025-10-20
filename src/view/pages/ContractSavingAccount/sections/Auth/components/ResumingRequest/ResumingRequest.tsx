import React from "react";
import ResumingScreen from "../../../../../../assets/csa/resumingScreen.svg";
import { Stack } from "@/components/Stack";
import { IonSpinner } from "@ionic/react";
import { motion } from "framer-motion";

const ResumingRequest: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <motion.div
        className="text-center max-w-[60vh] mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Stack direction="column" space={16} paddingY={8} align="center">
          <motion.img
            src={ResumingScreen}
            alt="BANCO GUAYAQUIL LOGO"
            className="mx-auto mb-4"
            draggable={false}
            style={{ maxWidth: "60vh" }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          <IonSpinner className="scale-125 text-black mx-auto" name="dots" />
          <motion.p
            className="text-gray-700 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Estamos cargando tus datos para la creación de tu Cuenta de Ahorros
          </motion.p>
        </Stack>
      </motion.div>
    </div>
  );
};

export default ResumingRequest;
