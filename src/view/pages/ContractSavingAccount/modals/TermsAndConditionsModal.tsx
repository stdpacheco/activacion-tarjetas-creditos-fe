import { Stack } from "@/components/Stack";
import { Button } from "@/view/shared/components";
import { Modal } from "@/view/shared/modals";
import IonIcon from "@reacticons/ionicons";
import { FC, useEffect } from "react";

interface TermsAndConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsAndConditionsModal: FC<TermsAndConditionsModalProps> = (props) => {
  const handleOpenCompletePolicies = () => {
    
    window.open(
      "https://assets.ctfassets.net/jhuukrkt1w7q/4KJNf244Hk51fepKxlm1pw/b28bd8d3e855fb831830ffd65cf152e1/Tratamiento_de_Uso_de_Datos_BG_CANALES_enero_23.pdf",
      "_blank"
    );
  };

  const handleClose = () => {
    
    props.onClose();
  };

  useEffect(() => {
    if (props.isOpen) {
      
    }
  }, [props.isOpen]);

  return (
    <Modal
      isOpen={props.isOpen}
      className="sm:end"
      onClose={handleClose}
      contentClass="sm:w-[50%] lg:w-[50%] sm:h-full lg:h-auto"
    >
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1>
            <strong>Política de uso de datos personales</strong>
          </h1>
          <IonIcon name="close-outline" size="large" onClick={handleClose} />
        </div>
        <Stack direction="column" paddingY={16} space={16}>
          <div
            className="max-h-[60dvh] sm:max-h-[80dvh] lg:max-h-[50dvh] overflow-x-none overflow-y-auto text-pretty text-base wrap-none"
            style={{ scrollbarWidth: "thin" }}
          >
            <p>
              Este es un resumen de lo que debes saber sobre nuestra actual Política de
              Uso de Datos Personales y por qué es necesaria tu autorización. Al final de
              este resumen encontrarás el enlace que te permitirá acceder a la versión
              extendida de esta información.
            </p>
            <br />
            <label className="font-bold">
              ¿Quién es el responsable del tratamiento de tus datos personales?
            </label>
            <p>
              Es Banco Guayaquil S. A., identificado con Registro Único de Contribuyentes
              Nº 0990049459001, con domicilio en las calles Pichincha 107 y P. Icaza, en
              la ciudad de Guayaquil, Ecuador.
            </p>
            <br />
            <label className="font-bold">¿Cuál es el objetivo de esta Política?</label>
            <p>
              Que conozcas cómo tratamos los datos personales que nos proporcionas o que
              obtenemos cuando usas nuestros canales de atención.
            </p>
            <br />
            <label className="font-bold">
              ¿Para qué usamos tus datos personales en nuestros canales?
            </label>
            <p>Usaremos tus datos personales para lo siguiente:</p>
            <Stack direction="row" justify="start" space={8} paddingX={8}>
              <span>-</span>
              <p>
                Gestionar su uso para brindarte los servicios que hayas adquirido con el
                Banco.
              </p>
            </Stack>
            <Stack direction="row" justify="start" space={8} paddingX={8}>
              <span>-</span>
              <p>Mejorar la navegación y modo de uso de nuestros canales.</p>
            </Stack>
            <Stack direction="row" justify="start" space={8} paddingX={8}>
              <span>-</span>
              <p>Realizar nuevos prototipos, versiones o actualizaciones.</p>
            </Stack>
            <Stack direction="row" justify="start" space={8} paddingX={8}>
              <span>-</span>
              <p>
                Preparar propuestas de productos o servicios comercializados por nosotros
                o nuestras subsidiarias o aliados comerciales.
              </p>
            </Stack>
            <Stack direction="row" justify="start" space={8} paddingX={8}>
              <span>-</span>
              <p>
                Contactarte para darte información sobre productos, ofertas, promociones,
                sorteos, verificación de datos o cualquier tipo de información por mandato
                de regulaciones vigentes.
              </p>
            </Stack>
            <p>
              De ser necesario que compartamos alguno de tus datos, te garantizamos que
              será exclusivamente con áreas de negocio del Banco o partes relacionadas de
              forma directa con las actividades y servicios brindados por el Banco, y que
              se encuentran especificados en la versión extendida de esta Política. Te
              recordamos que las entidades financieras tenemos prohibido comercializar las
              bases de datos de los clientes.
            </p>
            <p>
              En todo momento adoptaremos las medidas de seguridad que garanticen la
              protección de tus datos, y que eviten su alteración, pérdida o accesos no
              autorizados.
            </p>
            <br />
            <label className="font-bold">¿Por qué tu autorización es importante?</label>
            <div>
              <p>
                Para poder recopilar tus datos, ya que son esenciales para el acceso y
                correcta operación de nuestros canales de atención y por lo tanto de
                nuestros servicios. Tu autorización nos permitirá seguir ofreciéndote
                nuestros servicios. Tu autorización nos permitirá acceder a los datos que
                necesitamos para seguir atendiéndote en este canal, así como brindarte
                productos y servicios financieros ajustados a tus necesidades.
              </p>{" "}
              <p> Entonces:</p>
              <Stack direction="row" justify="start" space={8} paddingX={8}>
                <span>-</span>
                <p>
                  Guardaremos tus datos según lo aprobado y establecido en el marco
                  regulatorio y por los entes de control.
                </p>
              </Stack>
              <Stack direction="row" justify="start" space={8} paddingX={8}>
                <span>-</span>
                <p>
                  Tus datos personales serán parte de una base de datos de clientes y
                  usuarios de Banco Guayaquil, que será inscrita ante la autoridad de
                  control cumpliendo con la Ley Orgánica de Protección de Datos
                  Personales.
                </p>
              </Stack>
              <Stack direction="row" justify="start" space={8} paddingX={8}>
                <span>-</span>
                <p>
                  Te notificaremos si los permisos que nos das en esta actualización
                  cambian o se modifican.
                </p>
              </Stack>
            </div>{" "}
            <br />
            <label className="font-bold">
              ¿Cuáles son los datos que nos autorizas a recopilar?
            </label>
            <div>
              <p> Nos autorizas a recopilar los siguientes datos:</p>

              <Stack direction="row" justify="start" space={8} paddingX={8}>
                <span>-</span>
                <p>
                  Referencias personales y/o patrimoniales a las que las entidades del
                  sistema financiero ecuatorianas tengan acceso de acuerdo con la ley.
                </p>
              </Stack>

              <Stack direction="row" justify="start" space={8} paddingX={8}>
                <span>-</span>
                <p>
                  Los datos relacionados con tu comportamiento como cliente o usuario de
                  nuestros productos y/o servicios financieros, así como del cumplimiento
                  de tus obligaciones.
                </p>
              </Stack>

              <Stack direction="row" justify="start" space={8} paddingX={8}>
                <span>-</span>
                <p>
                  Tus gustos o preferencias a fin de personalizar nuestra oferta de
                  productos y servicios, enviar publicidad relacionada con esas
                  preferencias, mejorar la experiencia de navegación en nuestros canales,
                  entre otros fines, para lo cual podemos utilizar cookies u otras
                  tecnologías análogas.
                </p>
              </Stack>

              <Stack direction="row" justify="start" space={8} paddingX={8}>
                <span>-</span>
                <p>
                  Tu dirección IP, sistema operativo, navegadores, motores de búsqueda,
                  entre otros.
                </p>
              </Stack>

              <Stack direction="row" justify="start" space={8} paddingX={8}>
                <span>-</span>
                <p>
                  En nuestros canales electrónicos nos autorizas, según tu dispositivo, a:
                  usar tu cámara, lector de huellas, acceder a tu libreta de contactos y
                  enviarte notificaciones, con el único fin de validar tu identidad y
                  cumplir con la prevención de fraudes.
                </p>
              </Stack>
            </div>{" "}
            <br />
            <label className="font-bold">
              ¿Por cuánto tiempo conservaremos tus datos?
            </label>
            <p>
              Conservaremos tus datos por el plazo máximo aprobado en las regulaciones
              promulgadas por las autoridades de protección de datos personales, con
              excepción de aquellos datos que, por mandato de la normativa aplicable en el
              ámbito de las entidades financieras, deban permanecer en nuestra custodia
              con sujeción a los tiempos fijados en esa normativa.
            </p>{" "}
            <br />
            <label className="font-bold">
              ¿Ante quién podrás ejercer tus derechos relacionados con la protección de
              datos?
            </label>
            <p>
              La Ley Orgánica de Protección de Datos Personales protege tus derechos de
              acceso, eliminación, rectificación y actualización, oposición, anulación,
              limitación del tratamiento y a no ser objeto de una decisión basada
              únicamente en valoraciones automatizadas, y demás derechos consagrados en
              esta ley. Para ejercerlos, debes enviar una solicitud escrita a:
              <a
                href="mailto:protecciondatospersonales@bancoguayaquil.com"
                className="font-bold text-link underline cursor-pointer"
              >
                protecciondatospersonales@bancoguayaquil.com
              </a>
              .
            </p>{" "}
            <br />
            <label className="font-bold">
              ¿Puedes revocar la autorización que nos otorgaste?{" "}
            </label>
            <p>
              Sí puedes revocarla, en el marco de los aspectos y alcances que se explican
              en la Ley Orgánica de Protección de Datos Personales y en nuestro Documento
              de Tratamiento de Datos. Para esto, debes enviar una petición a la dirección
              de correo electrónico arriba indicada, especificando cuál es la finalidad
              que deseas revocar.
            </p>
          </div>

          <div className="lg:px-8 justify-center">
            <a
              onClick={handleOpenCompletePolicies}
              className="grid text-base text-link font-bold p-4 underline justify-center cursor-pointer"
            >
              Leer la versión completa de la política
            </a>
            <Button label="Cerrar" size="sm" onClick={handleClose} />
          </div>
        </Stack>
      </div>
    </Modal>
  );
};
