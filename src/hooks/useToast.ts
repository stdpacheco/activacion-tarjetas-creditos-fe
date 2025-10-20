import { ReactNode } from "react";
import { toast } from "sonner";

interface IPropsToast {
  title?: string;
  description?: string;
  icon?: ReactNode;
  duration?: number;
}

export const useToast = () => {
  const error = (props: IPropsToast) => {
    toast.error(props.title ?? "", {
      position: "top-right",
      description: props.description,
      style: {
        background: "#FBE8E9",
      },
      classNames: {
        title: "font-bold",
        description: "text-base",
        content: "px-4 sm:px-4 lg:px-4",
        icon: "ml-2 text-xl text-red-500",
      },
    });
  };

  const info = (props: IPropsToast) => {
    toast.info(props.title, {
      position: "top-right",
      description: props.description,
      classNames: {
        title: "font-bold",
        description: "text-base",
        content: "p-4",
        icon: "py-4 px-2 text-xl pl-4",
      },
    });
  };

  const success = (props: IPropsToast) => {
    toast.success(props.title, {
      position: "top-right",
      description: props.description,
      style: {
        background: "#E7F3E5",
      },
      classNames: {
        title: "font-bold",
        description: "text-base",
        content: "px-4 sm:px-4 lg:px-4",
        icon: "ml-2 text-xl text-green-500 color-green-500",
      },
    });
  };

  return { error, info, success };
};
