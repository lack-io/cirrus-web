import axios from '@/utils/request'

const api = {
  getProxy: '/api/v1/proxy'
}

export default api

export function getProxy () {
  return axios({
    url: api.getProxy,
    method: 'get'
  })
}
