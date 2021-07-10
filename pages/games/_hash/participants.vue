<template>
  <div class="mx-auto col-sm-9 col-md-7 col-lg-4 mnvcD-container small-board">
    <MobileHeader class="display-mobile-flex" />
    <div class="mnvcD-wrapper">
      <div class="container">
        <img
          src="/images/bml-back.svg"
          alt="backward button"
          class="backward-nav"
          @click="$router.go(-1)"
        />
        <h3 class="mnvcD-heading">Players</h3>
        <ParticipantsBoard />
      </div>
    </div>
  </div>
</template>
<script>
import MobileHeader from "@/components/partials/mobile_header";
import ParticipantsBoard from "@/components/game/participants-board";
export default {
  components: {
    MobileHeader,
    ParticipantsBoard,
  },
};
</script>
<style scoped>
.mnvcD-wrapper {
  margin-top: 2rem !important;
}
.mnvcD-heading {
  font-size: 0.99rem;
  font-weight: bold;
  color: #00fff6;
  margin-top: 0.69rem;
  margin-bottom: 2rem;
}
.backward-nav {
  width: 1.04rem;
  height: 1.04rem;
  cursor: pointer;
}
</style>