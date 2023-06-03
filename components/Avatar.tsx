type Props = {
  url: string
};

export default function Avatar({ url }: Props) {
  return (
    <div className="absolute -top-40 left-0 w-32 h-32">
      <img src={url} className="rounded" alt="Profile image" />
    </div>
  )
}
