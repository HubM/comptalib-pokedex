<template>
  <input
    v-model.trim="search"
    type="text"
    aria-label="Button for searching a pokemon"
    class="input-search"
    :class="activeClass"
    :placeholder="placeholder"
    @input="onInput"
  />
</template>

<script>
export default {
  name: 'InputSearch',
  props: {
    placeholder: {
      type: String,
      default: 'Search a pokemon',
    },
  },
  data() {
    return {
      search: '',
    }
  },
  computed: {
    active() {
      return this.search.length >= 2
    },
    activeClass() {
      if (!this.active) {
        return
      }

      return 'input-search--active'
    },
  },
  methods: {
    onInput() {
      if (this.search && this.active) {
        const formattedSearch = this.search.trim().toLowerCase()
        this.$emit('search', formattedSearch)
      }
    },
  },
}
</script>
