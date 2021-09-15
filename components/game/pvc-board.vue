<template>
  <div
    class="d-flex flex-column align-items-center mx-auto xvhMBoard-box">
    <h2 class="xvhM">Be the 1st to attain "Diamond Hands"</h2>
    <PVCGamePrizes style="margin-top: 10px" :settings="gameSettings"/>
    <div class="xvhM-action-section">
      <div class="d-flex flex-row justify-content-center">
        <a
          href="javascript:void(0)"
          @click="$emit('play');"
          class="btn xvhM-action-btn"
          v-if="user && balance >= gameSettings.entryFeeInClout">Play</a
        >
        <a
          href="javascript:void(0)"
          @click="toggleInsufficientBalanceDialog"
          class="btn xvhM-action-btn"
          v-else-if="user && balance < gameSettings.entryFeeInClout"
          >Play</a
        >
        <a
          href="javascript:void(0)"
          @click="$bvModal.show('signInDialog');"
          class="btn xvhM-action-btn"
          v-else
          >Play</a
        >
      </div>
      <div class="my-3 d-flex flex-row justify-content-center xvhM-game-info">
        <span class="">Entry Fee:</span>
        <span class="">
          <div>&nbsp;&nbsp;&nbsp;&#8776; &dollar;{{ gameSettings.entryFee }} USD </div>
          <div>&nbsp;&nbsp;&nbsp;{{ gameSettings.entryFeeInClout }} &dollar;Clout</div></span>
      </div>
    </div>
  </div>
</template>
<script>
import PVCGamePrizes from '@/components/game/pvc-gameprizes';
export default {
  props: ["gameSettings"],
  components: {
    PVCGamePrizes
  },
  computed: {
    user() {
      return this.$store.getters.activeUser;
    },
    balance() {
      return this.$store.state.wallet.balance;
    },
  },
  methods: {
    toggleInsufficientBalanceDialog() {
      this.$bvModal.show("insufficientBalanceAlertDialog");
    },
  },
};
</script>
<style scoped>
.xvhMBoard-box {
  width: 40rem;
  max-width: 100%;
  padding: 2.5rem 1.3rem 1.3rem 1.3rem;
  margin-top: 2.4rem;
  border: 1px solid #a7178f;
  background: #a7178f linear-gradient(232deg, #a7178f 0%, #2b1097 100%) 0% 0%
    no-repeat padding-box;
  border: 1px solid #b19eff;
  border-radius: 1.25rem;
}
.active-game {
  border: 5px double #b19eff;
}
.xvhM {
  color: #fff;
  text-align: center;
  letter-spacing: 0px;
  font-size: 1.059rem;
  font-family: "Roboto Mono", Verdana, Geneva, Tahoma, sans-serif;
}
.diamond-xvhM {
  width: 150px;
  height: 150px;
  text-align: center;
  margin-top: 2.4rem;
}
.xvhM-game-title {
  text-align: left;
  font-size: 1.26rem;
  font-family: "SansationRegular", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Helvetica Neue", sans-serif;
  font-weight: bold;
  line-height: 1.8;
  letter-spacing: 0px;
  color: #f19de3;
  margin-top: 1.8rem;
  margin-bottom: 0.79rem;
}
.xvhM-game-type {
  text-align: center;
  font-size: 1.04rem;
  line-height: 1.14rem;
  font-family: "SansationRegular", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Helvetica Neue", sans-serif;
  letter-spacing: 0px;
  color: #ffffff;
}
.xvhM-pricing {
  margin-top: 1.5rem;
  text-align: center;
  letter-spacing: 0px;
  color: #00fff6;
  font-size: 1.35rem;
  line-height: 1.85rem;
  font-weight: bold;
  padding-bottom: 1rem;
  border-bottom: solid 0.063rem #8f6ad6;
}
.xvhM-action-section {
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.xvhM-action-btn {
  padding: 0.88rem 1.66rem;
  min-width: 9.5rem;
  max-height: 3.75rem;
  text-align: center;
  outline: 0 !important;
  background: #a7178f linear-gradient(258deg, #a7178f 0%, #2b1097 100%) 0% 0%
    no-repeat padding-box;
  border: 1px solid #b19eff;
  border-radius: 10px;
  color: #fff;
  font-size: 1.3rem;
  font-weight: bold;
}
.action-btn-info span {
  text-align: left;
  font-size: 0.73rem;
  line-height: 1.38rem;
  letter-spacing: 0px;
  color: #f19de3;
}
.action-btn-info.left span {
  text-align: right;
}
.action-btn-info .action-countdown * {
  font-size: 0.86rem;
  font-weight: bold;
  margin-right: 0.313rem;
  color: #00fff6;
}
.xvhM-game-info {
  font-size: 0.8rem;
  line-height: 1.68rem;
  letter-spacing: 0px;
  color: #f19de3;
}
@media (max-width: 580px) {
  .xvhM-pricing {
    font-size: 1.25rem;
    line-height: 1.65rem;
  }
}
</style>