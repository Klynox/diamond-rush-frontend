<template>
  <div>
    <div class="d-flex justify-content-center align-items-center fullpage-loader" v-if="isPageLoading">
      <div
        class="
          d-lg-flex
          mx-auto
          flex-column
          align-items-center
          justify-content-center
          text-center
          diamond-hands-notice
          mt-plenty
        "
      >
        <img
          class="my-4 mx-auto hands-image"
          src="/images/inactive-diamon-hands.svg"
          alt="Diamond Hands"
        />
      </div>
    </div>
    <div v-else></div>
  </div>
</template>
<script>
export default {
  computed: {
    isPageLoading() {
      return this.$store.getters.fullpageLoading;
    },
  },
};
</script>
<style lang="scss" scoped>
@keyframes animation1 {
  0% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }
  50% {
    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -ms-transform: scale(1.2);
    -o-transform: scale(1.2);
    transform: scale(1.2);
  }
  100% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }
}

@-webkit-keyframes animation1 {
  0% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }
  50% {
    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -ms-transform: scale(1.2);
    -o-transform: scale(1.2);
    transform: scale(1.2);
  }
  100% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }
}
.diamond-hands-notice {
  .hands-image {
    width: 8.7rem;
    -webkit-animation: animation1 2s linear infinite;
    animation: animation1 2s linear infinite;
  }
}
.mt-plenty {
  margin-top: 0.99rem !important;
}
.fullpage-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: rgba(0, 0, 0, 0.87);
}
</style>