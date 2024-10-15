import { Project } from '@/types'
import axios from 'axios'

const api = axios.create({ baseURL: 'https://semillerobackend-production.up.railway.app' })

// Obtener todos los proyectos
const getData = async () => {
  return (await api.get<{ projects: Project[] }>('/data')).data
}

// Obtener proyecto específico
export const getDataById = async (id: number) => {
  return (await api.get<Project>('/data/' + id)).data;
};
  
// Crear un nuevo proyecto
const postData = async (newProject: Project) => {
  return await api.post('/data', newProject)
}

// Eliminar un proyecto por ID
const deleteData = async (id: number) => {
  return await api.delete('/data/' + id)
}

// Actualizar un proyecto por ID
const updateData = async (id: number, updatedProject: Project) => {
  return await api.put('/data/' + id, updatedProject)
}

export { getData, postData, deleteData, updateData }