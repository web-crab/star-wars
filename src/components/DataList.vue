<template>
  <ul class="data-list">
    <li v-for="key in keys" :key="key">
      {{ parseTitle(key) }}: <span class="data-list__value">{{ data[key] }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'data-list',
  props: {
    data: {
      type: Object,
      required: true
    },
    keysToShow: Array
  },
  computed: {
    keys () {
      return this.keysToShow || Object.keys(this.data)
    }
  },
  methods: {
    parseTitle (key) {
      const title = key.replace(/_/g, ' ')
      return title[0].toUpperCase() + title.slice(1)
    }
  }
}
</script>

<style>

.data-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1.25em;
}

.data-list__value {
  color: var(--color-text-2);
}

</style>
