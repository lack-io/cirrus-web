import request from '@/utils/request'

const api = {
  userList: '/api/v1/goods',
  deleteUser: '/api/v1/goods'
}

export default api

export function getGoodList (page, size) {
  return request({
    url: api.userList + `?page=${page}&size=${size}`,
    method: 'get'
  })
}

export function deleteGood (id) {
  return request({
    url: api.deleteUser + '/' + `${id}`,
    method: 'delete',
    data: {}
  })
}
