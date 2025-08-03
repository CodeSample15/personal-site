import { useLocation } from "react-router-dom"
import { ProjectCard } from "../components/ProjectCard"
import Markdown from 'react-markdown'
import type React from "react";

export const Projects = () => {
  const location = useLocation().pathname;

  return (
    location.split('/').length == 2 ?
    <>
      <div className="d-flex m-5 p-1 gap-2 align-items-center flex-column">
        <h1 className="display-1">Projects</h1>
        <p className="text-success-emphasis">I like to make some personal projects as a hobby using technology. Below are some of my favorites. </p>
      </div>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <ProjectCard BannerSrc="Projects/Squiggly/banner.png" Name="Squiggly" Brief="An esoteric scripting language written in C++" ProjectPageUrl="/projects/Squiggly" GithubUrl="https://github.com/CodeSample15/Squiggly"/>
      </div>
    </>
    :
    <>
      {getProjectPage(location.split('/')[2])}
    </>
  )
}

function getProjectPage(location:string): React.ReactElement {
  let markdownContent = ""

  if(location === 'Squiggly') {
  }

  return <div className="m-5 p-5">{markdownContent}</div>;
}
