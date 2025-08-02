import { ProjectCard } from "../components/ProjectCard"

export const Projects = () => {
  return (
    <>
      <div className="d-flex m-5 p-1 gap-2 align-items-center flex-column">
        <h1 className="display-1">Projects</h1>
        <p className="text-success-emphasis">I like to make some personal projects as a hobby using technology. Below are some of my favorites. </p>
      </div>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <ProjectCard BannerSrc="Projects/Squiggly/banner.png" Name="Squiggly" Brief="An esoteric scripting language written in C++" ProjectPageUrl="" GithubUrl="https://github.com/CodeSample15/Squiggly"/>
      </div>
    </>
  )
}
