import React from 'react'
import './Projects.css'

function Projects() {
  const projectData = [
  {
    title: "Portfolio Website",
    description: "A personal portfolio built with React and Tailwind.",
    link: "https://myportfolio.com"
  },
  {
    title: "Weather App",
    description: "Real-time weather updates using OpenWeather API.",
    link: "https://weatherapp.com"
  },
  {
    title: "Todo App",
    description: "Task manager with drag and drop features.",
    link: "https://todoapp.com"
  },
  {
    title: "Blog Platform",
    description: "Markdown blog platform with full CRUD.",
    link: "https://myblog.com"
  },
  {
    title: "E-Commerce Store",
    description: "Product store with Stripe integration.",
    link: "https://mystore.com"
  }
];

  return (
    <div id='Projects'>
      <div className="projectcontainer">
      <div className="navprojects">
             <h2>Projects</h2>
      </div>
      <div className="contentprojects">
         <div className="publicprojects">
          <h1>Public projects</h1>
          <div className="flipcards">
          <h1> Npm Library project</h1>

          </div>
         </div>
       <div className="Selfprojects">
           <h1>Self Projects</h1>
  {projectData.map((project, i) => (
    <div className="flipcardeffects">

    <div className={`flipcards ${i % 2 === 0 ? 'flipcardA' : 'flipcardB'}`} key={i}>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
    </div>
    </div>
  ))}
</div>

      </div>
      </div>
    </div>
  )
}

export default Projects
