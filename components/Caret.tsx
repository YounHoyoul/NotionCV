import { RxCaretDown, RxCaretRight } from "react-icons/rx";

type Props = {
  open: boolean
}

export default function Caret({ open }: Props) {
  return (
    <span className="absolute top-5 right-2">
      {open ? <RxCaretDown className="text-gray-500 text-lg" /> : <RxCaretRight className="text-gray-500 text-lg" />}
    </span>
  )
}