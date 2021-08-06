<template>
  <div
    class="
      d-flex
      flex-row
      justify-content-between
      nav-container
      display-mobile-flex
    "
  >
    <nuxt-link class="d-flex align-items-center logo-wrapper" to="/">
      <img src="/images/logo.svg" class="logo" alt="Diamond Rush"/>
      </nuxt-link
    >
    <client-only><NavProfile /></client-only>
  </div>
</template>
<script>
import NavProfile from "@/components/partials/nav-profile.vue";
export default {
  components: {
    NavProfile,
  },
};
</script>
<style scoped>
.nav-container {
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  padding-top: 0.9375rem;
}
.logo {
  width: 1.875rem;
  height: 1.875rem;
}
.logo-wrapper span {
  font-size: 1.02rem;
  letter-spacing: 1px;
  margin-left: 0.4rem;
  color: #111111;
}
</style>