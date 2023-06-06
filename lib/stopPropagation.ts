import { MouseEvent } from "react";

export const stopPropagation = (e: MouseEvent<HTMLElement>) => {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
};