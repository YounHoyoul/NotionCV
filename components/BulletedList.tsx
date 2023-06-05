import Text from './Text';

type Props = {
  content: NotionBulletedListItem[]
};

export default function BulletedList({ content }: Props) {
  return (
    <ul className="list-disc pl-8 pr-4 flex flex-col gap-2">
      {content.map((item, index) => <li className="" key={index}><Text text={item.rich_text} fontSize='sm' /></li>)}
    </ul>
  )
}