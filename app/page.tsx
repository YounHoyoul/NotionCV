import { FaGithub } from "react-icons/fa";

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
import EducationServiceInterface from "@/services/EducationServiceInterface";

export default async function Home() {

  const projectService = container.resolve<ProjectServiceInterface>('ProjectServiceInterface');
  const projectsGroupByCompany = await projectService.groupByCompany();

  const experienceService = container.resolve<ExperienceServiceInterface>('ExperienceServiceInterface');
  const experiences = await experienceService.allWithProjects();

  const certService = container.resolve<CertServiceInterface>('CertServiceInterface');
  const certs = await certService.allCerts();
  const patents = await certService.allPatents();

  const educationService = container.resolve<EducationServiceInterface>('EducationServiceInterface');
  const educations = await educationService.all();

  const profileService = container.resolve<ProfileServiceInterface>('ProfileServiceInterface');
  const profile = await profileService.profile();

  return (
    <>
      <Cover url={profile.cover?.external.url} />
      <main className="flex min-h-screen flex-col items-center justify-between py-24 px-4 md:px-8 lg:px-24">
        <div className="flex flex-col gap-4 relative w-full">
          <Avatar url={profile.icon?.external.url} />
          <Title title={profile.name[0].plain_text} />
          <a href="https://github.com/YounHoyoul/NotionCV" 
            target="_blank" 
            className="absolute cursor-pointer right-0 top-[2px]">
            <FaGithub className="text-4xl text-black dark:text-white"/>
          </a>
          <div className="flex flex-wrap gap-4">
            <div className="w-full xl:basis-1/3-gap-4">
              <AboutMe profile={profile} />
            </div>
            <div className="w-full xl:basis-2/3-gap-4">
              <Experience experiences={experiences} />
            </div>
          </div>
          <Skill
            frontends={await projectService.groupByFrontend()}
            backends={await projectService.groupByBackend()}
            languages={await projectService.groupByLanguage()}
            webDbServers={await projectService.groupByWebDbServer()}
          />
          <Projects projectsGroupByCompany={projectsGroupByCompany} />
          <div className="flex flex-wrap gap-4">
            <div className="w-full">
              <License licenses={certs} />
            </div>
            <div className="w-full sm:basis-1/2-gap-4">
              <Education educations={educations}/>
            </div>
            <div className="w-full sm:basis-1/2-gap-4">
              <Patents patents={patents} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
