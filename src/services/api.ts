import axios from 'axios'

export const api = axios.create({
  // localhost:3000/api , não é necessário colocar o começo
  baseURL: '/api'
})