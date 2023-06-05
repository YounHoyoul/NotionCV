
type Props = {
    label: string
};

export default function Label({ label }: Props) {
    return <label className="text-xs text-gray-500 dark:text-gray-400">{label}:</label>;
}
