import { ButtonSelectionGroup } from "../components/ButtonSelectionGroup"

export const About = () => {
  return (
    <div className="p-3">
      <h1>About Me</h1>
      <hr />
      <p>
        Hi! 👋 <br />
        My name is <strong className="text-success-emphasis">Luke Crimi</strong>. <br /> <br />
        
        🎓 I'm currently pursuing my bachelor's degree in Computer Science and Engineering at <strong>Lehigh University</strong>.<br />
        💻 I'm hoping to enter a career involving <span className="text-warning-emphasis">embedded systems, automation scripting, robotics, and/or low(er) level programming in general.</span> <br /> <br />


      </p>

      <hr />

      <h3>Hobbies</h3>
      <ButtonSelectionGroup list_titles={['Drones', 'Running', 'Guitar', 'Skiing', 'Game-Dev', 'Programming']} 
                            list_content={["I enjoy building, flying, and repairing FPV drones for fun. I also fly DJI drones for video and photography purposes.", 
                              "I used to do cross country in high school, but now I mostly just run casually. It's a fun way for me to blow off steam and exercise.",
                              "I picked up guitar since my dad keeps a lot of them in the house and plays himself. Probably one of my favorite ways to relax at the end of the day is to play some random song I know.",
                              "Another physical activity I do casually. I don't race but I enjoy going out to a mountain a few times a year when I can.",
                              "I've developed and released two mobile games: Accelerate and Bullet Bounce. The latter can't be found online anymore, but the former can still be installed from itch.io",
                              "Check out my projects page to see some of the random things I've made in my spare time. I enjoy challenging myself with learning something new or making something cool."
                            ]}/>
      <br />
      <br />

      <h2>About this site</h2>
      <hr />
      <p>
        This website was made with React, Typescript, Vite, and Bootstrap.

        Something immediately obvious: I'm not great at frontend design. My goal with this website was not to show off my webdev skills. <br /> <br />

        You may be asking <strong className="text-danger-emphasis">"why not just use a website generator or LLM in that case?"</strong> <br /> <br />

        That's a great question. Honestly, I think I just liked the idea of a casual challenge for myself. I've been learning how to use React and Typescript for a different project and figured I'd use
        my new knowledge on something for myself. Plus, I prefer not to use LLMs or generators when I'm trying to learn a new skill. I'll use LLMs to help explain concepts, but when writing code, I learn
        best when I'm forced to type and really think about what goes into my codebase. <br /> <br />

        The main purpose of this website is for me to have someplace where I can put my up-to-date resume, post updates for projects I'm working on, and do basically whatever I want with. <br /><br />

        Check out the projects tab of this site, I promise it has more interesting undertakings than the website itself.
      </p>
    </div>
  )
}
