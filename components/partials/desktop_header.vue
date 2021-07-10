<template>
  <div
    class="
      d-flex
      flex-row mb-5
      justify-content-between
      nav-container
      display-pc-flex
    "
  >
    <nuxt-link to="/"
      ><img src="/images/logo.svg" class="logo" alt="Diamond Rush"
    /></nuxt-link>
    <NavProfile />
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
</style>