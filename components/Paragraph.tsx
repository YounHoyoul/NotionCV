import Text from './Text';

type Props = {
  content: NotionParagraph[]
};

export default function Paragraph({ content }: Props) {
  return (
    <>
      {content.map((item, index) => <Text key={index} text={item.rich_text} />)}
    </>
  )
}
