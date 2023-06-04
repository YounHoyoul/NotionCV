import Card from "./Card";
import SelectItem from "./SelectItem";
import SelectItems from "./SelectItems";
import Text from "./Text";

type Props = {
  company: Experience,
  projects: Project[]
};

export default function ProjectAccordion({ company, projects }: Props) {
  return (
    <div className="w-full mt-4">
      <h2 className={`text-md w-full py-4 font-bold block border-b-2`}>
        {company.name[0].plain_text}
        <span className="text-sm font-normal"> · {company.workingPeriod}</span>
      </h2>
      <div className="flex flex-wrap mt-4 gap-4">
        {projects.map((project, index) => {
          return (
            <Card key={index} className="md:basis-1/2-gap-4 lg:basis-1/3-gap-4 xl:basis-1/4-gap-4 flex flex-col gap-2">
              <p className="text-xs mt-2">{project.company}</p>
              <Text text={project.name} fontSize="md" fontWeight={false} />
              <p className="text-xs mt-2">{project.workingPeriod}</p>
              <SelectItem item={project.role}/>
              <SelectItems items={[...project.frontend, ...project.backend, ...project.webDbServer]} />
              <div className="hidden">
                <Text text={project.responsibility} fontSize="sm" fontWeight={false} />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  )
}
