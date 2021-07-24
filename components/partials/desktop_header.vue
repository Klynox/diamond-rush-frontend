<template>
  <div
    class="
      d-flex
      flex-row
      mb-5
      justify-content-between
      nav-container
      display-pc-flex
      align-items-center
    "
  >
    <nuxt-link class="d-flex align-items-center logo-wrapper" to="/">
      <img src="/images/logo.svg" class="logo" alt="Diamond Rush" />
      <span class="d-none d-md-block">DiamondRush</span>
    </nuxt-link>
    <client-only>
      <NavProfile />
    </client-only>
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
  padding-top: 15px;
}
.logo {
  width: 1.875rem;
  height: 1.875rem;
}
.logo-wrapper {
  text-decoration: none;
}
.logo-wrapper span {
  font-size: 1.08rem;
  margin-left: 0.5rem;
  letter-spacing: 1px;
  color: #fff;
}
@media (max-width: 49.375rem) {
  .logo-wrapper span {
    font-size: 0.8rem;
  }
}
</style>