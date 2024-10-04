import { Project } from '@/types'
import axios from 'axios'

const api = axios.create({ baseURL: 'https://semillerobackend-production.up.railway.app' })

const getData = async () => {
    return (await api.get<{ projects : Project[] }>('/data')).data
}

const postData = async ( newProject : Project ) => {
    return await api.post('/data', newProject)
}

const deleteData = async ( id : number ) => {
    return await api.delete('/data/' + id)
}

const updateData = async ( id : number ) => {
    return await api.put('/data/' + id)
}

export { getData, postData, deleteData, updateData }