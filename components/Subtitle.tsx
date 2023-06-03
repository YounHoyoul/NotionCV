type Props = {
  title: string,
  className?: string,
  children?: React.ReactNode
};

export default function Subtitle({ title, children, className }: Props) {
  return (
    <div className="rounded bg-gray-300 dark:bg-gray-900 p-4">
      <h2 className={`${className} text-md flex gap-2`}>{children}{title}</h2>
    </div>
  )
}