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

  const projectService = container.resolve<ProjectServiceInterface>('ProjectServiceInterface');
  const projectsGroupByCompany = await projectService.groupByCompany();

  const experienceService = container.resolve<ExperienceServiceInterface>('ExperienceServiceInterface');
  const experiences = await experienceService.allWithProjects();

  const certService = container.resolve<CertServiceInterface>('CertServiceInterface');
  const certs = await certService.allCerts();

  const profileService = container.resolve<ProfileServiceInterface>('ProfileServiceInterface');
  const profile = await profileService.profile();

  return (
    <>
      <Cover url={profile.cover?.external.url} />
      <main className="flex min-h-screen flex-col items-center justify-between py-24 px-4 md:px-8 lg:px-24">
        <div className="relative w-full">
          <Avatar url={profile.icon?.external.url} />
          <Title title={profile.name[0].plain_text} />
          <AboutMe profile={profile} />
          <Experience experiences={experiences} />
          <Skill
            frontends={await projectService.groupByFrontend()}
            backends={await projectService.groupByBackend()}
            languages={await projectService.groupByLanguage()}
            webDbServers={await projectService.groupByWebDbServer()}
          />
          <Projects projectsGroupByCompany={projectsGroupByCompany} />
          <div className="flex flex-wrap xl:flex-row -mx-4 mt-4">
            <div className="w-full lg:w-1/2 p-4">
              <Education />
            </div>
            <div className="w-full lg:w-1/2 p-4">
              <Patents />
            </div>
            <div className="w-full p-4">
              <License licenses={certs} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
