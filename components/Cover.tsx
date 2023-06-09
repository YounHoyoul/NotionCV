type Props = {
  url: string
};

export default function Cover({ url }: Props) {
  return (
    <div className="overflow-hidden h-36 relative w-full opacity-80 transition">
      <img src={url} alt="Cover Image" className="absolute -top-80 max-w-[1024px] lg:max-w-full" />
    </div>
  )
}
