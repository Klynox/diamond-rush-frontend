<template>
  <div class="d-flex fle-row justify-content-between mb-4 display-mobile-flex">
    <div v-if="user" class="d-flex flex-column wMxY-balance">
      <span class="wMxY-balance-title">Balance: </span
      ><span>{{balance}} &dollar;Clout</span>
      <span class="wMxy-balance-usd">&#8776; &dollar;{{balanceIndollars}} USD</span>
    </div>
    <div v-if="user" class="d-flex flex-column wMxY-actions">
      <a href="javascript:void(0)" type="button" @click="toggleDepositModal"
        ><img src="/images/wMxy-deposit.svg" alt="deposit" />Deposit</a
      >
      <a href="javascript:void(0)" type="button" @click="toggleWithdrawalModal"
        ><img src="/images/wMxy-withdrawal.svg" alt="withdrawal" />Withdraw</a
      >
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    user() {
      return this.$store.getters.activeUser;
    },
    balance() {
      return this.$store.state.wallet.balance;
    },
    balanceIndollars() {
      return this.$store.state.wallet.usdEquivalent;
    },
  },
  methods: {
    toggleDepositModal() {
      this.$bvModal.show("depositDialog");
    },
    toggleWithdrawalModal() {
      this.$bvModal.show("withdrawalDialog");
    },
  },
};
</script>
<style scoped>
.wMxY-balance {
  text-align: left;
  font-size: 0.77rem;
  color: #fff;
}
.wMxY-balance-title {
  color: #f19de3;
}
.wMxy-balance-usd {
  color: #00fff6;
  font-weight: bold;
}
.wMxY-actions a {
  color: #00fff6;
  font-size: 0.77rem;
}
.wMxY-actions a img {
  padding-right: 7px;
  width: 1.2rem;
  height: 1.2rem;
}
</style>