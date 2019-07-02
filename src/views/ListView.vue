<template>
  <div>
    <List
      v-show="list.length"
      :items="list"
      :is-loading="isLoading"
      @bottom="page++"
    />
    <div v-show="isLoading"><Loader /></div>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import List from '@/components/List'
import Loader from '@/components/Loader'

export default {
  name: 'list-view',
  props: {
    moduleName: String
  },
  components: { List, Loader },
  data: () => ({
    page: 1,
    isLoading: false,
    isLastPage: false,
    error: ''
  }),
  watch: {
    page: {
      immediate: true,
      handler: 'fetchList'
    }
  },
  computed: {
    list () {
      return this.$store.state[this.moduleName].list
    }
  },
  methods: {
    async fetchList (page) {
      if (this.isLastPage || this.error) return

      this.isLoading = true
      try {
        this.isLastPage = await this.$store.dispatch(`${this.moduleName}/fetch`, page)
      } catch (e) {
        this.error = e.message
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
