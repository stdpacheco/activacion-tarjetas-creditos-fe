export const enum InputPatterns {
  credentials,
  newPassword,
  text,
  address,
  number,
  globalNumber,
  alias,
  email,
  emailAlt,
}

export const pattersRegExp = {
  [InputPatterns.credentials]: /^[a-zA-Z0-9\-_@]*$/,
  [InputPatterns.newPassword]: {
    eightAndFourteenChars: /^.{8,14}$/,
    atLeastUppAndLow: /(?=.*[a-z])(?=.*[A-Z])/,
    atLeastOneNumber: /[0-9]/,
  },

  [InputPatterns.text]: /^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ]*$/,
  [InputPatterns.address]: /^[a-zA-Z0-9\s,.'-]/,
  [InputPatterns.number]: /^[0-9]*$/,
  [InputPatterns.alias]: /^[A-Za-z0-9.&ñÑáéíóúÁÉÍÓÚ ]/,
  [InputPatterns.email]: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
  [InputPatterns.emailAlt]:
    /^[a-zA-ZñÑ0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
};
