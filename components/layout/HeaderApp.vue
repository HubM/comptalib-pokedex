<template>
  <header>
    <nav>
      <flex-container no-gutter tag="ul" class="middle-xs">
        <flex-item xs6 tag="li">
          <nuxt-link to="/" class="baseline">Catch them all</nuxt-link>
        </flex-item>
        <!-- <flex-item xs6 tag="li">
          <nuxt-img
            src="/logo.svg"
            alt="The application logo, a pokeball"
            width="50"
            height="50"
          />
        </flex-item> -->
      </flex-container>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderApp',
}
</script>
