import SelectItem from "./SelectItem";

type Props = {
  items: SelectItem[]
};

export default function SelectItems({ items }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => <SelectItem key={index} item={item} />)}
    </div>
  )
}
