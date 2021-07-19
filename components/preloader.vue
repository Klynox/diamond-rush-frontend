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
</template>
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
  max-height: 51rem;
  .hands-image {
    width: 12.7rem;
    -webkit-animation: animation1 2s linear infinite;
    animation: animation1 2s linear infinite;
  }
}
.mt-plenty {
  margin-top: 5rem !important;
}
</style>