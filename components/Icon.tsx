
type Props = {
  icon?: NotionUrl | NotionEmoji
}

export default function Icon({ icon }: Props) {
  if (!icon) {
    return (<></>);
  }

  if (icon.type == "external") {
    return <img src={icon.external.url} className="w-6 h-6" />
  }

  return (
    <span className="text-xl">{icon.emoji}</span>
  )
} 