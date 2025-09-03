import { ButtonSelectionGroup } from "../components/ButtonSelectionGroup"

export const About = () => {
  return (
    <div className="p-5">
      <h1>About Me</h1>
      <hr />
      <p>
        Hi! 👋 <br />
        My name is <strong className="text-success-emphasis">Luke Crimi</strong>. <br /> <br />
        
        I'm currently pursuing my bachelor's degree in Computer Science and Engineering at <strong>Lehigh University</strong>.<br />
        I'm hoping to obtain a career involving <p className="text-warning-emphasis">embedded systems, automation scripting, robotics, and/or low level programming in general.</p> <br />

        <h3>Hobbies</h3>
        <ButtonSelectionGroup list_titles={['']} 
                              list_content={['']}/>
        I'm also a drone pilot, a runner, a guitar player, a skier, and a hobbyist game developer.
        


      </p>
      

      <h2>About this site</h2>
      <hr />
      <p>
        So if you couldn't tell already, I'm not great at frontend design. My goal with this website was not to show off my webdev skills. <br /> <br />

        You may be asking <strong className="text-warning-emphasis">"why not just use a website generator in that case?"</strong> <br /> <br />

        That's a good question. Honestly, the idea of putting minimal effort into building a cool looking website was tempting, but it just sounded lame to me. 
      </p>
    </div>
  )
}
