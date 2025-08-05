import { ProjectCard } from "../components/ProjectCard"
import Markdown from 'react-markdown'
import { useEffect, useState } from "react";

interface Props {
  page?: string | null;
};

export const Projects = ({page=null} : Props) => {
  const [markdown, setMarkdown] = useState('');

  useEffect(()=> {
    if(page) {
      const localPath = `/Projects/${page}/pageContent.md`

      fetch(localPath)
        .then((res)=>res.text())
        .then((text) => setMarkdown(text))
        .catch((err)=>console.error("Error reading markdown: ", err));
    }
    else {
      setMarkdown('');
    }
  });

  return (
    !page ?
    <>
      <div className="d-flex m-5 pt-3 gap-2 align-items-center flex-column">
        <h1 className="display-1">Projects</h1>
        <p className="text-success-emphasis">I like to make some personal projects as a hobby using technology. Below are some of my favorites. </p>
      </div>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <ProjectCard BannerSrc="Projects/Squiggly/banner.png" Name="Squiggly" Brief="An esoteric scripting language written in C++" ProjectPageUrl="/projects/Squiggly" GithubUrl="https://github.com/CodeSample15/Squiggly"/>
      </div>
    </>
    :
    <>
      <div className="m-5 p-5">
        <Markdown>{markdown}</Markdown>
      </div>
    </>
  )
}
