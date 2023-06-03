import Text from './Text';

type Props = {
  content: NotionBulletedListItem[]
};

export default function BulletedList({ content }: Props) {
  return (
    <ul className="list-disc pl-4">
      {content.map((item, index) => <li className="" key={index}><Text text={item.rich_text} /></li>)}
    </ul>
  )
}