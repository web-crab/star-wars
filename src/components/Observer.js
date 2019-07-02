export default {
  name: 'observer',
  data: (vm) => ({
    prevRatio: 0,
    observer: new IntersectionObserver(vm.listener, { threshold: 0.01 })
  }),
  mounted () {
    this.observer.observe(this.$el)
  },
  beforeDestroy () {
    this.observer.disconnect()
  },
  methods: {
    listener ([entry]) {
      if (entry.boundingClientRect.top < innerHeight) {
        const event = entry.boundingClientRect.bottom > this.prevRatio ? 'enter' : 'leave'
        this.$emit(event, entry.target)
      }
      this.prevRatio = entry.intersectionRatio
    }
  },
  render () {
    return this.$slots.default[0]
  }
}
