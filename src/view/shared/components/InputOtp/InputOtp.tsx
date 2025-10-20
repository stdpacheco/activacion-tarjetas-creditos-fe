import { FC } from "react";
import { useFormContext } from "react-hook-form";
import OTPInput from "react-otp-input";
import styles from "./input-otp.module.scss";

interface InputOtpProps {
  name: string;
  isDisabled: boolean;
}

export const InputOtp: FC<InputOtpProps> = ({ name, isDisabled }) => {
  const { watch, setValue } = useFormContext();

  return (
    <div>
      <OTPInput
        value={watch(name)}
        shouldAutoFocus
        onChange={(value) => {
          if (isDisabled) return;

          setValue(name, value);
        }}
        numInputs={6}
        inputType="tel"
        inputStyle={styles.otpInput}
        renderSeparator={<span className="separator-input"> </span>}
        renderInput={(data, index) => (
          <input
            id={`input_otp_${index}`}
            {...data}
            placeholder="-"
            disabled={isDisabled}
          />
        )}
      />
    </div>
  );
};
