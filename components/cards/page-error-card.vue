<template>
  <div class="d-flex flex-row justify-content-between">
    <div
      class="
        other-smaller-board
        d-lg-flex
        mx-auto
        flex-column
        align-items-center
        justify-content-center
        text-center
        mt-plenty
      "
    >
      <div class="error-xbhjdH">
        <slot></slot>
        <nuxt-link to="/" class="btn xbnc-btn" v-if="!homeBtn">Continue</nuxt-link>
        <nuxt-link to="/" class="btn xbnc-btn" v-else>Go to home</nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['homeBtn']
}
</script>
<style lang="scss" scoped>
.diamond-hands-notice {
  max-height: 51rem;
}
.mt-plenty {
  margin-top: 7.8rem !important;
}
.error-xbhjdH {
  border-radius: 1.34rem;
  background: #a7178f linear-gradient(248deg, #a7178f 0%, #2b1097 100%) 0% 0%
    no-repeat padding-box;
  border: 1px solid #b19eff;
  position: relative;
  padding: 1rem;
  width: 100%;
  pointer-events: auto;
  outline: 0;
  font-size: 1rem;
}
.other-smaller-board {
  width: 30rem;
  max-width: 83.333333%;
}
.xbnc-btn {
  display: block;
  color: #00fff6;
  text-decoration: underline;
}
</style>