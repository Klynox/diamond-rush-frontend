<template>
  <div class="d-flex">
    <ul class="d-flex flex-row list-unstyled display-pc-flex">
      <li class="nav-dhlB">
        <a class="" href="javascript:void(0)" type="button" @click="toggleWithdrawalModal"
          ><img src="/images/wMxy-withdrawal.svg" alt="withdrawal" />Withdraw
        </a>
      </li>
      <li class="nav-dhlB">
        <a class="" href="javascript:void(0)" type="button" @click="toggleDepositModal"
          ><img src="/images/wMxy-deposit.svg" alt="deposit" />Deposit
        </a>
      </li>
      <li class="nav-dhlB">
        <div class="d-flex flex-column wMxY-balance">
          <span class="wMxY-balance-title"
            >Balance:
            <span style="font-size: 0.74rem; color: #fff"
              >1.057474950 $Clout</span
            ></span
          >
          <span class="wMxy-balance-usd">&#8776; &dollar;140 USD</span>
        </div>
      </li>
    </ul>
    <div class="d-inline-block">
      <div class="d-flex flex-row nav-profile">
        <img src="/images/profile-placeholder-bhl.png" alt="Ugochukwu" />
        <span>Ugochukwu</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
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
.nav-profile {
  align-items: center;
  padding: 0.188rem;
}
.nav-profile img {
  width: 1.95rem;
  height: 1.95rem;
  border: solid 0.063px #c2c1c9;
  border-radius: 50%;
}
.nav-profile span {
  font-size: 0.938rem;
  font-weight: 400;
  margin-right: 0.375rem;
  margin-left: 0.375rem;
  color: #fff;
  mix-blend-mode: difference;
}
.nav-dhlB + .nav-dhlB {
  margin-left: 1rem;
}
.nav-dhlB:last-of-type {
  margin-right: 1rem;
}
.nav-dhlB .wMxY-balance {
  text-align: left;
  font-size: 0.77rem;
  color: #fff;
}
.nav-dhlB .wMxY-balance-title {
  color: #f19de3;
}
.nav-dhlB .wMxy-balance-usd {
  color: #00fff6;
  font-weight: bold;
}
.nav-dhlB a {
  color: #00fff6;
  font-size: 0.77rem;
}
.nav-dhlB a img {
  padding-right: 7px;
  width: 1.2rem;
  height: 1.2rem;
}
@media (min-width: 40rem) {
  .nav-dhlB + .nav-dhlB {
    margin-left: 2.2rem;
  }
  .nav-dhlB:last-of-type {
    margin-right: 2.2rem;
  }
}
@media (min-width: 47.813rem) {
  .nav-dhlB + .nav-dhlB {
    margin-left: 2.6rem;
  }
  .nav-dhlB:last-of-type {
    margin-right: 2.6rem;
  }
}
</style>