import { useState } from "react";
import { DropdownButton } from "./DropdownButton";
import WhatsappIcon from "@/components/assets/whatsapp-icon.svg";
import RequestIcon from "@/components/assets/request-icon.svg";
import CallIcon from "@/components/assets/icon-call.svg";
import DisclaimerImage from "@/view/assets/csa/disclaimer.svg";
import { GeneralValidationModal } from "../modals";
import { useCSAStore } from "../store/useCSA";
import { CSAProccessStepType, useStepStore } from "../store/useStepStore";

export const SupportOptions = () => {
  const [deleteRequestModal, setDeleteRequestModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const csaStore = useCSAStore();
  const stepStore = useStepStore();

  const deleteRequest = () => {
    setLoading(true);

  };

  const supportOptions = [
    {
      label: "Escribir a nuestro Whatsapp",
      icon: WhatsappIcon,
      onClick: () => {
        window
          .open(
            "https://api.whatsapp.com/send?phone=593983730100&text=Hola,%20necesito%20ayuda%20de%20un%20asesor%20para%20abrir%20mi%20Cuenta%20de%20Ahorros%20desde%20el%20App",
            "_blank"
          )
          ?.focus();
      },
    },
    {
      label: "Llamar a nuestro Contact Center",
      icon: CallIcon,
      onClick: () => {
        window
          .open("https://www.bancoguayaquil.com/conocenos/contacto/", "_blank")
          ?.focus();
      },
    },
  ];

  if (csaStore.idRecord && stepStore.currentStep !== CSAProccessStepType.Account) {
    supportOptions.push({
      label: "Empezar una nueva solicitud",
      icon: RequestIcon,
      onClick: () => setDeleteRequestModal(true),
    });
  }

  return (
    <>
      <DropdownButton buttons={supportOptions} />
      <GeneralValidationModal
        isOpen={deleteRequestModal}
        title="Empezar una nueva solicitud"
        description="Al crear una nueva solicitud, eliminaremos toda la información que has llenado hasta ahora y deberás empezar desde cero."
        image={DisclaimerImage}
        actionPrimary={{
          text: "Eliminar solicitud actual",
          onAction: () => deleteRequest(),
        }}
        actionSecondary={{
          text: "Continuar con mi solicitud",
          onAction: () => setDeleteRequestModal(false),
        }}
        loading={loading}
      />
    </>
  );
};
