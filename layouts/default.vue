<template>
  <div>
    <header-app @toggle-team-modal="toggleTeamModal" />
    <main class="main-container">
      <nuxt />
    </main>
    <footer-app />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LayoutDefault',
  mounted() {
    this.setTeamIfExist({
      localForage: this.$localForage,
    })
  },
  methods: {
    ...mapActions({
      setTeamIfExist: 'team/setTeamIfExist',
    }),
    toggleTeamModal() {
      console.log('YOOOOOOO')
    },
  },
}
</script>
