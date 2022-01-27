<template>
  <header class="header">
    <nav>
      <flex-container no-gutter tag="ul" class="middle-xs">
        <flex-item xs6 tag="li">
          <nuxt-link to="/" class="header__baseline" :class="baselineClass"
            >Catch them all &#x270C;</nuxt-link
          >
        </flex-item>
        <flex-item v-if="!team.length" xs6 tag="li">
          <button class="header__button" @click="$emit('toggle-team-modal')">
            <nuxt-img
              v-if="showTeam"
              src="/cross.svg"
              alt="Icon to close the modal"
              width="30"
              height="30"
            />
            <nuxt-img
              v-else
              src="/pokeball.svg"
              alt="The application logo, a pokeball"
              width="40"
              height="40"
            />
          </button>
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
