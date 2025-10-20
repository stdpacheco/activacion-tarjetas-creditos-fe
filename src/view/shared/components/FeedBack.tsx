import { IonIcon } from "@ionic/react";
import { chatbubbles } from "ionicons/icons";
import { Button } from "./Button/Button";

export const FeedBack = () => {
  return (
    <div className="container-feedback">
      <div className="title-feedback">
        <IonIcon icon={chatbubbles} className="icon-message-feedback"></IonIcon>
        <span>Tu opinión es importante</span>
      </div>

      <div className="description-feedback">
        Ayúdanos a mejorar respondiendo unas preguntas, te tomará menos de 1 minuto.
      </div>
      <Button
        label="Ir a la encuesta"
        onClick={() =>
          window.open("https://appbancoguayaquil.typeform.com/nuevabanca", "_blank")
        }
        id="continue_button_otp"
      />
    </div>
  );
};
