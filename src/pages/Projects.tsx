import type { ReactNode } from "react";
import { ProjectCard } from "../components/ProjectCard"

import { Squiggly } from "./Projects/Squiggly";
import { KerasCodeGenerator } from "./Projects/KerasCodeGenerator";

interface Props {
  page?: string | null;
};

export const Projects = ({page=null} : Props) => {
  return (
    !page ?
    <>
      <div className="d-flex m-5 pt-3 gap-2 align-items-center flex-column">
        <h1 className="display-1">Projects</h1>
        <p className="text-success-emphasis">I like to make some personal projects as a hobby using technology. Below are some of my favorites. </p>
      </div>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <ProjectCard BannerSrc="Projects/Squiggly/banner.png" 
                    Name="Squiggly" 
                    Brief="An esoteric scripting language written in C++" 
                    ProjectPageUrl="/projects/Squiggly" 
                    GithubUrl="https://github.com/CodeSample15/Squiggly"/>

        <ProjectCard BannerSrc="Projects/Keras-Code-Generator/banner.png" 
                    Name="Keras Code Generator" 
                    Brief="A GUI application made 
with Unity to generate Keras code" 
                    ProjectPageUrl="/projects/Keras-Code-Generator" 
                    GithubUrl="https://github.com/CodeSample15/KerasCodeGenerator"/>
      </div>
    </>
    :
    <>
      <div className="m-5 p-3">
        {getProjectPage(page)}
      </div>
    </>
  )
}

function getProjectPage(page: string) : ReactNode {
  if(page === 'Squiggly')
    return <Squiggly/>
  if(page === 'Keras-Code-Generator')
    return <KerasCodeGenerator/>
  return <></>;
}
