import clsx from "clsx";
import { MouseEvent } from "react";
import { RxCaretRight } from "react-icons/rx";

type Props = {
  open: boolean,
  topClassName?: string,
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void
}

export default function Caret({ open, topClassName, onClick }: Props) {
  return (
    <span onClick={onClick} className={clsx(
      "absolute",
      topClassName ? topClassName : "top-5",
      "right-2",
      "cursor-pointer",
      "transition",
      "duration-300",
      open && "rotate-90"
    )}>
      <RxCaretRight className="text-gray-500 dark:text-gray-300 text-lg" />
    </span>
  )
}