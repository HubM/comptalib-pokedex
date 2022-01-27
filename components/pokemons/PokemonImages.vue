<template>
  <flex-container no-gutter>
    <flex-item xs12 class="pokemon__sprites__main">
      <nuxt-img
        :src="imgSrc"
        :alt="`default picture of pokemon`"
        width="300"
        class="center-block"
      />
    </flex-item>
    <flex-item v-if="sprites.versions" xs12>
      <div class="">
        <h2 class="center-text margin-null">Versions</h2>
        <flex-container tag="ul" class="center-xs" no-gutter>
          <flex-item
            v-for="(version, index) in sprites.versions"
            :key="`${version.name}-${index}`"
            tag="li"
          >
            <p>{{ version.name }}</p>
            <div @click="setImg(version.sprite)">
              <nuxt-img
                format="webp"
                width="70"
                :src="version.sprite"
                :alt="`default picture of pokemon in ${version.name} version`"
              />
            </div>
          </flex-item>
        </flex-container>
      </div>
    </flex-item>
  </flex-container>
</template>

<script>
export default {
  name: 'PokemonImages',
  props: {
    sprites: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      imgSrc: this.sprites.default,
    }
  },
  methods: {
    setImg(src) {
      if (this.imgSrc !== src) {
        this.imgSrc = src
      }
    },
  },
}
</script>
