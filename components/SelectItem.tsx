import clsx from "clsx";

type Props = {
  item: SelectItem,
  hoverStyle?: string
};

export default function SelectItem({ item, hoverStyle }: Props) {
  const colorVariants: { [key: string]: string } = {
    default: 'bg-slate-100 text-slate-800 dark:opacity-80',
    gray: 'bg-gray-100 text-gray-800 dark:opacity-80',
    green: 'bg-green-100 text-green-800 dark:opacity-80',
    red: 'bg-red-100 text-red-800 dark:opacity-80',
    blue: 'bg-blue-100 text-blue-800 dark:opacity-80',
    brown: 'bg-amber-100 text-amber-800 dark:opacity-80',
    purple: 'bg-purple-100 text-purple-800 dark:opacity-80',
    orange: 'bg-orange-100 text-orange-800 dark:opacity-80',
    yellow: 'bg-yellow-100 text-yellow-800 dark:opacity-80',
    pink: 'bg-pink-100 text-pink-800 dark:opacity-80',
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
