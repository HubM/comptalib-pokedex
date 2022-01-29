<template>
  <header class="header">
    <nav>
      <flex-container no-gutter tag="ul" class="middle-xs">
        <flex-item xs6 tag="li">
          <nuxt-link to="/" class="header__baseline" :class="baselineClass"
            >Catch them all &#x270C;</nuxt-link
          >
        </flex-item>
        <flex-item v-if="team.length" xs6 tag="li" class="position-relative">
          <button
            class="button header__button"
            @click="$emit('toggle-team-modal')"
          >
            <icon-cross v-if="showTeam" :width="20" :height="20" />
            <icon-pokeball v-else />
          </button>
          <span v-if="!showTeam" class="header__team-indicator">{{
            team.length
          }}</span>
        </flex-item>
      </flex-container>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderApp',
  props: {
    showTeam: {
      type: Boolean,
      default: false,
    },
    team: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    baselineClass() {
      return this.$route.name === 'index' ? 'disabled' : ''
    },
  },
}
</script>
