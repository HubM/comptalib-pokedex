<template>
  <button class="button backToTop" :class="showClass">
    <icon-backtotop :width="20" :height="20" />
  </button>
</template>

<script>
import throttle from '~/helpers/functions/throttle'

export default {
  name: 'BackToTop',
  props: {
    deviceHeight: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      show: false,
    }
  },
  computed: {
    showClass() {
      return this.show ? 'show' : ''
    },
  },
  beforeMount() {
    window.addEventListener('scroll', throttle(this.handleScroll, 150))
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      if (window.scrollY > this.deviceHeight) {
        this.show = true
        return
      }
      this.show = false
    },
  },
}
</script>
