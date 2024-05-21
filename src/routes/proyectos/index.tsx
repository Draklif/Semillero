import { createFileRoute, Link } from '@tanstack/react-router'
import data from '../../data/data.json'

export const Route = createFileRoute('/proyectos/')({
  component: ProjectList
})

function ProjectList() {
  const { projects } = data

  return <>
    {projects?.map((project, index) => {
      return <>
        <div key={index}>{project.name}</div>
        <Link to={`/proyectos/${project.id}`}>Ver ahora</Link>
      </>
    })}
  </>
}