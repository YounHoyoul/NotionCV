import slugify from "slugify";
import SelectItem from "./SelectItem";

type Props = {
  title: string,
  items: SelectItem[]
};

export default function LinkedSelectItems({ title, items }: Props) {
  return (
    <>
      {items.map((item, index) =>
        <a key={index} href={`#${slugify(title+' ' + item.name)}`} className="hover:opacity-80 dark:opacity-100">
          <SelectItem key={index} item={item} />
        </a>
      )}
    </>
  )
}
