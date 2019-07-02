<template>
  <ul class="list">
    <li
      v-for="(item, i) in items" :key="item.id"
      class="list__item"
      :style="getDelay(i)"
    >
      <router-link
        class="list__link"
        :to="`${$route.path}/${item.id}`"
      >
        {{ item.name }}
      </router-link>
    </li>

    <Observer
      v-if="!isLoading"
      @enter="$emit('bottom')"
    ><li style="height: 4em"/></Observer>

  </ul>
</template>

<script>
import Observer from '@/components/Observer'

export default {
  name: 'list',
  components: { Observer },
  props: {
    items: {
      type: Array,
      required: true
    },
    isLoading: Boolean
  },
  methods: {
    getDelay (i) {
      const delay = (i % 10) * 25
      return {
        'animation-delay': `${delay}ms`
      }
    }
  }
}
</script>

<style>

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list__link {
  position: relative;
  display: inline-block;
  color: inherit;
  font-size: 3em;
  font-weight: bold;
  text-decoration: none;
  padding: 0.25em 0;
  transition: color 0.25s;
}

.list__link:before {
  content: '';
  display: block;
  position: absolute;
  bottom: 0.1em;
  left: 0;
  background-color: currentColor;
  width: 0;
  height: 0.1em;
  transition: width 0.25s ease-in-out, background-color 0s;
}

.list__link:hover {
  color: var(--color-text-2);
}

.list__link:hover:before {
  width: 100%;
}

.list__item {
  opacity: 0;
  transform: scale(0.25) translate3d(0, 100%, 0);
  transform-origin: 0 100%;
  animation: list__item 0.25s ease-out forwards;
}

@keyframes list__item {
  to {
    opacity: 1;
    transform: scale(1) translate3d(0, 0, 0);
  }
}

</style>
