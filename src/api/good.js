import axios from '@/utils/request'

const api = {
  userList: '/api/v1/goods',
  deleteUser: '/api/v1/goods'
}

export default api

export function getGoodList (page, size) {
  return axios({
    url: api.userList + `?page=${page}&size=${size}`,
    method: 'get'
  })
}

export function deleteGood (id) {
  return axios({
    url: api.deleteUser + '/' + `${id}`,
    method: 'delete',
    data: {}
  })
}
