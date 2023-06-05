import Card from "./Card";
import ItemTitle from "./ItemTitle";
import Text from "./Text";

type Props = {
  item: Cert,
  className?: string
};

export default function CertCard({ item, className }: Props) {
  return (
    <Card className={className}>
      <ItemTitle items={item.name} icon={item.icon}/>
      <Text text={item.issueOrganization} fontSize="xs" fontWeight={"normal"} />
      <p className="text-xs">{item.issueDate.start}</p>
    </Card>
  )
}