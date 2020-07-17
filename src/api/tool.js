import request from '@/utils/request'

export function xmltoExcel(data) {
  return request({
    url: '/testsuiteForOneStep',
    method: 'get',
    data
  })
}