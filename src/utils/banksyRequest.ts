import axios from 'axios'

const banksyRequest = axios.create({
  baseURL: 'http://192.168.1.9:25566'
})

banksyRequest.interceptors.request.use(config => {
  return config
})

export default banksyRequest