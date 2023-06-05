
type Props = {
  items: NotionText[],
  children?: React.ReactNode
};

export default function ItemTitle({ items, children }: Props) {
  return (
    <p className="text-md font-medium">
      {children}
      {items[0].plain_text}
    </p>
  )
}