import Icon from "./Icon";

type Props = {
  items: NotionText[],
  icon?: NotionUrl | NotionEmoji | NotionFile,
  onClick?: () => void,
  className?: string,
  children?: React.ReactNode
};

export default function ItemTitle({ items, icon, onClick, className, children }: Props) {
  return (
    <p className={`text-md font-medium pr-4 flex gap-2 items-top rounded ${className}`} onClick={onClick}>
      <Icon icon={icon} />
      {children}
      <span>{items[0].plain_text}</span>
    </p>
  )
}