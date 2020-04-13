import {AddLabel,GetAllLabels,GetTableData,UpdateTableData,AddTableData} from '@/api/app'

const app = {
  state: {
    Labels:[]
  },
  mutations: {
    SET_LABELS: (state,Labels) => {
      state.Labels = Labels
    }
  },
  actions: {
    addLabel({commit},params){
      return new Promise((resolve, reject) => {
        AddLabel(params).then(response => {
          const data = response.data
          commit('SET_LABELS',data.data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getAllLabels({commit},params){
      return new Promise((resolve, reject) => {
        GetAllLabels(params).then(response => {
          const data = response.data
          commit('SET_LABELS',data.data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getTableData({commit},params){
      return new Promise((resolve, reject) => {
        GetTableData(params).then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateTableData({commit},params){
      return new Promise((resolve, reject) => {
        UpdateTableData(params).then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    addTableData({commit},params){
      return new Promise((resolve, reject) => {
        AddTableData(params).then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default app
