import clsx from "clsx";

type Props = {
  item: SelectItem,
  hoverStyle?: string
};

export default function SelectItem({ item, hoverStyle }: Props) {
  const colorVariants: { [key: string]: string } = {
    default: 'bg-slate-100 text-slate-800 dark:bg-slate-100 transition',
    gray: 'bg-gray-200 text-gray-800 dark:bg-gray-100 transition',
    green: 'bg-green-100 text-green-800 dark:bg-green-100 transition',
    red: 'bg-red-100 text-red-800 dark:bg-red-100 transition',
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-100 transition',
    brown: 'bg-amber-100 text-amber-800 dark:bg-amber-100 transition',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-100 transition',
    orange: 'bg-orange-100 text-orange-800 dark:bg-orange-100 transition',
    yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-100 transition',
    pink: 'bg-pink-100 text-pink-800 dark:bg-pink-100 transition',
  };

  return (
    <span className={clsx(
      'text-xs',
      'px-2',
      'py-1',
      'rounded',
      colorVariants[item?.color ?? 'default'],
      hoverStyle)}
    >{item?.name}</span>
  )
}
