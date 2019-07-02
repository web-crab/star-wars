export default ({ endpoint }) => ({
  namespaced: true,
  state: {
    list: []
  },
  getters: {
    getById (state) {
      return (id) => state.list.find((item) => item.id === id)
    }
  },
  mutations: {
    add (state, item) {
      state.list.push(item)
    }
  },
  actions: {
    async fetch ({ commit, getters }, page) {
      const params = { page }
      const response = await this.$http.get(endpoint, { params })
      const items = response.data.results.map(parseItem)
      const isLastPage = !response.data.next

      for (const item of items) {
        if (!getters.getById(item.id)) {
          commit('add', item)
        }
      }

      return isLastPage
    },
    async fetchOne ({ commit, getters }, id) {
      if (!getters.getById(id)) {
        const response = await this.$http.get(`${endpoint}/${id}`)
        commit('add', parseItem(response.data))
      }
    }
  }
})

function parseItem (item) {
  const parsedItem = {
    id: parseId(item.url)
  }

  for (const key in item) {
    parsedItem[key] = Array.isArray(item[key])
      ? item[key].map(parseId)
      : item[key]
  }

  return parsedItem
}

function parseId (url) {
  const parts = url.split('/')
  return parts[parts.length - 2]
}
