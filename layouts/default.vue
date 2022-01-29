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
    <modal-team v-if="showTeam" :team="team" @delete="onDeletePokemon" />
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
    this.$localForage.clear()
  },
  methods: {
    ...mapActions({
      setTeamIfExist: 'team/setTeamIfExist',
      deletePokemon: 'team/deletePokemon',
    }),
    toggleTeamModal() {
      this.showTeam = !this.showTeam
    },
    onDeletePokemon(index) {
      this.deletePokemon({
        localForage: this.$localForage,
        index,
      })
        .then(() => {
          alert('Pokemon deleted from your team !')
          if (!this.team.length) {
            this.showTeam = false
          }
        })
        .catch(() => {
          alert(
            "Pokemon couldn't be deleted from your team, please try again later"
          )
        })
    },
  },
}
</script>
