import ProjectServiceInterface from "@/services/ProjectServiceInterface";
import { container } from "tsyringe";

export default async function Home() {

  const service = container.resolve<ProjectServiceInterface>('ProjectServiceInterface');
  await service.all();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='text-4xl'>Hoyoul's Projects</h1>
    </main>
  )
}
