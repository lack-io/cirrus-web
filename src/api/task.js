import axios from '@/utils/request'

const api = {
  startTask: '/api/v1/task/action/start',
  clearTask: '/api/v1/task/action/clear'
}

export default api

export function startTask (root) {
  return axios({
    url: api.startTask,
    method: 'post',
    data: {
      root: root
    }
  })
}

export function clearTask () {
  return axios({
    url: api.clearTask,
    method: 'post',
    data: {}
  })
}
