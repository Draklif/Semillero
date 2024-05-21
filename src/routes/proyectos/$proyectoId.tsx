import { createFileRoute } from '@tanstack/react-router'
import data from '../../data/data.json'
import { useState } from 'react'

export const Route = createFileRoute('/proyectos/$proyectoId')({
  component: ProyectoComponent

})

function ProyectoComponent() {
  const { projects } = data

  const { proyectoId } = Route.useParams()

  const [project] = useState(projects.find((item) => Number(proyectoId) == item.id) )

  return <>
    <div>Post ID: {proyectoId}</div>
    <div>Titulo: {project?.name}</div>
    <div>
      <div>
        <img src={project?.images[0]} alt="" />
        <div></div>
      </div>
      <div>
        <img src={project?.images[0]} alt="" />
        <div>Descripcion: {project?.desc_short}</div>
        <div>Fecha: {project?.date}</div>
        <div>
        Autores: {project?.authors.map((author, index) => {
          if (index == project.authors.length - 1) {
            return (<span>{author.name}</span>)
          }
          return (<span>{author.name}, </span>)
        })}
        </div>
        <div>Etiquetas: {project?.tags}</div>
      </div>
    </div>
    <div>{project?.desc_long}</div>
    <div>{project?.links[0]}, {project?.links[1]}</div>
  </>
}