import Subtitle from "./Subtitle";

type Props = {
  children: React.ReactNode,
  className?: string,
};

export default function Card({ children, className }: Props) {
  return (
    <div className={`shadow border bg-white rounded p-4 w-full ${className}`}>
      {children}
    </div>
  )
}