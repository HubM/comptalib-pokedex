<template>
  <flex-container no-gutter>
    <flex-item xs12 class="pokemon__sprites__main">
      <nuxt-img :src="imgSrc" width="300" class="block-center" />
    </flex-item>
    <flex-item v-if="sprites.versions" xs12 class="pokemon_sprites__versions">
      <div class="">
        <h2 class="pokemon__sprites__versions__title">Versions</h2>
        <flex-container tag="ul" class="center-xs" no-gutter>
          <flex-item
            v-for="(version, index) in sprites.versions"
            :key="`${version.name}-${index}`"
            tag="li"
          >
            <p class="text-italic">{{ version.name }}</p>
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
