<template>
  <div>
    <header-app
      :team="team"
      :show-team="showTeam"
      @toggle-team-modal="toggleTeamModal"
    />
    <main class="main-container">
      <nuxt />
    </main>
    <footer-app />
    <modal-team v-if="showTeam" :team="team" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LayoutDefault',
  data() {
    return {
      showTeam: false,
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: this.showTeam ? 'body modal-open' : 'body',
      },
    }
  },
  computed: {
    ...mapGetters({
      team: 'team/team',
    }),
  },
  mounted() {
    this.setTeamIfExist(this.$localForage)
  },

  methods: {
    ...mapActions({
      setTeamIfExist: 'team/setTeamIfExist',
    }),
    toggleTeamModal() {
      this.showTeam = !this.showTeam
    },
  },
}
</script>
