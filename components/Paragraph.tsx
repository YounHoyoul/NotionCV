import Text from './Text';

type Props = {
  content: NotionParagraph[]
};

export default function Paragraph({ content }: Props) {
  return (
    <div className="flex flex-col gap-2 px-4">
      {content.map((item, index) => <Text key={index} text={item.rich_text} fontSize='sm' />)}
    </div>
  )
}
