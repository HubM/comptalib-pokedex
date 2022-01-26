<template>
  <header>
    <nav>
      <flex-container no-gutter tag="ul">
        <flex-item xs6 tag="li">
          <nuxt-link to="/">
            <nuxt-img
              src="/logo.svg"
              alt="The application logo, a pokeball"
              width="50"
              height="50"
            />
          </nuxt-link>
        </flex-item>
        <flex-item xs6 tag="li">
          <p class="baseline">Catch them all</p>
        </flex-item>
      </flex-container>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderApp',
}
</script>
