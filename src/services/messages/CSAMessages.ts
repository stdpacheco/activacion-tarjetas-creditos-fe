export const CSAMessages = {
  General: {
    ErrorGeneral: "Ocurrió un error de conexión, por favor inténtalo más tarde.",
  },
  PreValidation: {
    ReturnCodes: {
      "2": "El producto ingresado no es el correcto",
      "4": "Tiene un caso en curso",
      "5": "Error por servicio de biometria",
      "6": "Numero maximo de intento de verificacion de identidad",
      "7": "Crear solicitud error",
      "11": "Consultar solicitud",
      "10": "El número de cédula ingresado no es válido",
    },
  },
  FingerprintCode: {
    ReturnCodes: {
      "30": "Verifica tu código dactilar e inténtalo de nuevo",
    },
  },
  Biometric: {
    ReturnCodes: {
      "15": "No hemos podido validar tu identidad, por favor intenta nuevamente",
    },
  },
  ContractAccount: {
    ReturnCodes: {
      "5": "Expiró el tiempo para ingresar el código que te enviamos. Solicita uno nuevo para continuar.",
      "11": "Has excedido el límite de intentos con un código incorrecto. Solicita uno nuevo para continuar.",
      "6": "El código ingresado no es válido. Verifica que esté bien escrito y que el número de celular sea el correcto",
      "7": "Has excedido el límite de intentos con un código incorrecto. Solicita uno nuevo para continuar.",
    },
  },
  ValidacionOTP: {
    ErrorGeneralOTP: "El código OTP ingresado no es válido. Verifica que esté bien escrito y que el número de celular sea el correcto",
    ReturnCodes: {
      "40": "El código OTP ingresado no es válido. Verifica que esté bien escrito y que el número de celular sea el correcto",
      "41": "Has excedido el límite de intentos con un código incorrecto. Solicita uno nuevo para continuar.",
      "42": "Expiró el tiempo para ingresar el código que te enviamos. Solicita uno nuevo para continuar."
    },
  },
  ActivacionTarjeta: {
    ErrorGeneralActivacion: "No pudimos activar tu tarjeta, favor verifica que los datos sean correctos e inténtalo nuevamente.",
  }
};
