import request from '@/utils/request'

export function GetStatus(params){
  return request({
    url: '/count/status',
    method: 'get',
    params
  })
}

export function GetLabelCounts(params){
  return request({
    url: '/count/labels',
    method: 'get',
    params
  })
}
