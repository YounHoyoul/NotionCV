type Props = {
  title: string,
  children?: React.ReactNode
};

export default function Title({ title, children }: Props) {
  return (
    <h1 className='text-4xl font-bold pr-20 transition'>{children}{title}</h1>
  )
}
