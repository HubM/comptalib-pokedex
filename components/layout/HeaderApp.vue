<template>
  <header class="header">
    <nav>
      <flex-container no-gutter tag="ul" class="middle-xs">
        <flex-item xs6 tag="li">
          <nuxt-link to="/" class="header__baseline"
            >Catch them all &#x270C;</nuxt-link
          >
        </flex-item>
        <flex-item v-if="!team.length" xs6 tag="li">
          <button class="header__button" @click="$emit('toggle-team-modal')">
            <nuxt-img
              src="/pokeball.svg"
              alt="The application logo, a pokeball"
              width="50"
              height="50"
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
}
</script>
