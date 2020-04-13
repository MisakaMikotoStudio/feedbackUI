import request from '@/utils/request'



export function GetTableData(params){
  return request({
    url: '/data/query',
    method: 'get',
    params
  })
}

export function UpdateTableData(data){
  return request({
    url: '/data/modify',
    method: 'post',
    data
  })
}

export function AddTableData(data){
  return request({
    url: '/data/add',
    method: 'post',
    data
  })
}

//新增标签
export function AddLabel(params){
  return request({
    url: '/label/add',
    method: 'post',
    params
  })
}

//获取全部标签
export function GetAllLabels(data){
  return request({
    url: '/label/getAll',
    method: 'get'
  })
}
