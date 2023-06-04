type Props = {
  children: React.ReactNode,
  className?: string
};

export default function Card({ children, className }: Props) {
  return (
    <div className={`shadow border bg-white dark:border-0 dark:bg-gray-800 rounded p-4 w-full ${className}`}>
      {children}
    </div>
  )
}
