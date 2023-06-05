
type Props = {
  icon?: NotionUrl | NotionEmoji | NotionFile
}

export default function Icon({ icon }: Props) {
  if (!icon) {
    return (<></>);
  }

  if (icon.type == "external") {
    return <img src={icon.external.url} className="w-6 h-6 rounded" />
  }

  if (icon.type == "file") {
    return <img src={icon.file.url} className="w-6 h-6 rounded" />
  }

  return (
    <span className="text-lg">{icon.emoji}</span>
  )
} 