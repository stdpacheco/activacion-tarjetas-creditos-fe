import { IonSpinner } from "@ionic/react";
import classNames from "classnames";
import { FC, ReactNode } from "react";

interface RadioProps {
  label: string | ReactNode;
  name: string;
  onClick?: () => void;
  checked?: boolean;
  lines?: "full" | "none";
  isLoading?: boolean;
}

export const Radio: FC<RadioProps> = ({ isLoading = false, ...props }: RadioProps) => {
  return (
    <div
      className={classNames("text-base flex items-center justify-between", {
        "border-gray-300  border-b-[0.1px]": props.lines == "full",
      })}
      onClick={props.onClick}
    >
      <label className="pl-4" htmlFor={props.name}>
        {props.label}
      </label>
      {isLoading ? (
        <IonSpinner className="w-[16px] h-[16px] m-4" name="crescent" />
      ) : (
        <>
          <input
            className={classNames(
              "relative m-4 appearance-none w-[16px] h-[16px] border-[1px]  border-gray-400  rounded-full"
            )}
            type="radio"
          />
          <div
            className={classNames("absolute", {
              "w-[10px] h-[10px] rounded-full bg-primary right-[3px] mr-9 transition ease-in":
                props.checked,
            })}
          ></div>
        </>
      )}
    </div>
  );
};
