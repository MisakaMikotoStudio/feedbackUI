import {GetStatus,GetLabelCounts} from '@/api/Dashboard'

const Dashboard = {
  state: {

  },
  mutations: {

  },
  actions: {
    getLabelCounts({commit},params){
      return new Promise((resolve, reject) => {
        GetLabelCounts(params).then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getStatus({commit},params){
      return new Promise((resolve, reject) => {
        GetStatus(params).then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default Dashboard
