import { type DOMAttributes } from "react";
import { type WidgetComponent } from "@facephi/selphi-widget-web";

interface IMapItem {
  title: string;
  width: number;
  height: number;
}

declare global {
  type CustomElement<T> = Partial<T & DOMAttributes<T> & Record<"children", unknown>>;

  type MapType = Record<string, IMapItem>;

  namespace JSX {
    interface IntrinsicElements {
      ["facephi-selphi"]: CustomElement<WidgetComponent>;
    }
  }
}

export {};
