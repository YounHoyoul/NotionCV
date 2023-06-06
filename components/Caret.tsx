import { MouseEvent } from "react";
import { RxCaretDown, RxCaretRight } from "react-icons/rx";

type Props = {
  open: boolean,
  onClick?: (event:MouseEvent<HTMLSpanElement>) => void
}

export default function Caret({ open, onClick }: Props) {
  return (
    <span className="absolute top-5 right-2 cursor-pointer" onClick={onClick}>
      {open 
        ? <RxCaretDown className="text-gray-500 text-lg" /> 
        : <RxCaretRight className="text-gray-500 text-lg" />
      }
    </span>
  )
}