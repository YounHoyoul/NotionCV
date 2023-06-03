import CertServiceInterface from "@/services/CertServiceInterface";
import ExperienceServiceInterface from "@/services/ExperienceServiceInterface";
import ProfileServiceInterface from "@/services/ProfileServiceInterface";
import ProjectServiceInterface from "@/services/ProjectServiceInterface";
import { container } from "tsyringe";

import Cover from "@/components/Cover";
import AboutMe from "@/components/AboutMe";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import License from "@/components/License";
import Patents from "@/components/Patents";
import Skill from "@/components/Skill";
import Projects from "@/components/Projects";
import Avatar from "@/components/Avatar";
import Title from "@/components/Title";

export default async function Home() {

  // const service = container.resolve<ProjectServiceInterface>('ProjectServiceInterface');
  // await service.all();

  // const service = container.resolve<ExperienceServiceInterface>('ExperienceServiceInterface');
  // await service.all();

  // const service = container.resolve<CertServiceInterface>('CertServiceInterface');
  // await service.all();

  const service = container.resolve<ProfileServiceInterface>('ProfileServiceInterface');
  const profile = await service.profile();

  return (
    <>
      <Cover url={profile.cover?.external.url} />
      <main className="flex min-h-screen flex-col items-center justify-between py-24 px-4 md:px-8 lg:px-24">
        <div className="relative w-full">
          <Avatar url={profile.icon?.external.url} />
          <Title title={profile.name[0].plain_text} />
          <AboutMe profile={profile} />
          <Experience />
          <div className="flex flex-wrap xl:flex-row -mx-4 mt-4">
            <div className="w-full lg:w-1/2 p-4">
              <Education />
            </div>
            <div className="w-full lg:w-1/2 p-4">
              <License />
            </div>
            <div className="w-full lg:w-1/2 p-4">
              <Patents />
            </div>
          </div>
          <Skill />
          <Projects />
        </div>
      </main>
    </>
  )
}
