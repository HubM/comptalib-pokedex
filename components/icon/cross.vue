<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    :width="width"
    :height="height"
    viewBox="0 0 32.526 32.526"
    style="enable-background: new 0 0 32.526 32.526"
    xml:space="preserve"
  >
    <polygon
      points="32.526,2.828 29.698,0 16.263,13.435 2.828,0 0,2.828 13.435,16.263 0,29.698 2.828,32.526 16.263,19.091 
	29.698,32.526 32.526,29.698 19.091,16.263 "
    />
  </svg>
</template>

<script>
export default {
  name: 'IconCross',
  props: {
    width: {
      type: Number,
      default: 30,
    },
    height: {
      type: Number,
      default: 30,
    },
  },
}
</script>
