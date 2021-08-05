<template>
  <div>
    <b-modal hide-footer id="depositDialog" title="Quick Deposit">
      <div class="d-block text-center">
        <div class="form-caption">
          Send <span>Bitclout</span> to this public key
        </div>
        <div
          class="col-11 mx-auto payment-information d-flex"
          @click="copyCloutAddress"
        >
          <input
            type="hidden"
            id="depositCloutAddress"
            :value="depositCloutAddress"
          />
          <span class="copy-text">{{ depositCloutAddress }}</span>
          <img src="/images/copy.svg" alt="copy" />
        </div>
      </div>
    </b-modal>
    <b-modal hide-footer id="withdrawalDialog" title="Quick Withdrawal">
      <form @submit.prevent="submitWithdrawal" class="d-block text-center">
        <div class="alert alert-warning" v-if="errorMsg">{{ errorMsg }}</div>
        <div class="alert alert-success" v-if="successMsg">
          {{ successMsg }}
        </div>
        <h4 class="input-info">Enter amount to withdraw</h4>
        <div
          class="form-group d-flex col-9 col-sm-8 mx-auto mb-0"
          :class="{ 'mb-2': !withdrawalForm.amount }"
        >
          <input
            type="tel"
            placeholder="20.00"
            v-model="withdrawalForm.amount"
            class="form-control"
            :disabled="isLoading || loadingForm"
          />
          <label
            class="text-center"
            style="line-height: 2.4; margin-left: 0.43rem"
            >USD</label
          >
        </div>
        <div v-if="withdrawalForm.amount" class="mb-1">
          {{ cloutEquivalent }} <span style="color: #00fff6;">&dollar;Clout</span>
        </div>
        <h4 class="input-info">Enter Bitclout public key</h4>
        <div class="form-group d-flex col-9 col-sm-8 mx-auto">
          <input
            type="tel"
            placeholder="Bitclout public key"
            v-model="withdrawalForm.publicKey"
            class="form-control"
          />
        </div>
        <button
          class="btn col-5 mx-auto payment-information"
          type="submit"
          :disabled="isLoading || loadingForm"
        >
          <span v-if="loadingForm">Submitting request...</span>
          <span v-else>Withdraw</span>
        </button>
      </form>
    </b-modal>
    <b-modal
      hide-footer
      id="insufficientBalanceAlertDialog"
      title="Balance Alert"
    >
      <div class="d-block text-center">
        <div class="form-caption">
          You do not sufficient balance to play this game.<br />
          Fund your gaming account by sending Bitclout to this public key to be
          able to participate.
        </div>
        <div
          class="col-11 mx-auto payment-information d-flex"
          @click="copyCloutAddress"
        >
          <input
            type="hidden"
            id="depositCloutAddress"
            :value="depositCloutAddress"
          />
          <span class="copy-text">{{ depositCloutAddress }}</span>
          <img src="/images/copy.svg" alt="copy" />
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { auth } from '@/services/fireinit.js'
export default {
  data() {
    return {
      errorMsg: null,
      successMsg: null,
      dollarPerBitclout: null,
      isLoading: true,
      loadingForm: false,
      withdrawalForm: {
        amount: null,
        publicKey: null,
        userId: null,
      },
    };
  },
  computed: {
    depositCloutAddress() {
      return this.$store ? this.$store.state.wallet.publicKey : '';
    },
    cloutEquivalent() {
      if (!this.isLoading) {
        return (this.withdrawalForm.amount / this.dollarPerBitclout).toFixed(8);
      }
    },
  },
  created() {
    this.getUser();
    this.getExchangeRate();
  },
  methods: {
    getUser() {
      auth.onAuthStateChanged((user) => {
        this.withdrawalForm.userId = user.uid;
      });
    },
    submitWithdrawal: async function () {
      if (!this.withdrawalForm.userId) return;
      if (!this.withdrawalForm.amount || !this.withdrawalForm.publicKey) {
        this.errorMsg = "Please provide amount to withdraw and your public key.";
        return;
      }
      this.loadingForm = true;
      try {
        this.withdrawalForm.amountInClout = this.cloutEquivalent;
        await this.$axios.post("/request-withdrawal", this.withdrawalForm);
        this.errorMsg = null;
        this.successMsg = "Withdrawal successful!";
      } catch (err) {
        this.loadingForm = false;
        if (err.response.status == 400) {
          console.log(err.response);
          this.errorMsg = err.response.data.error;
          return;
        }
        this.errorMsg = "Request failed. Please check your internet connection and try again.";
      }
    },
    copyCloutAddress: function () {
      const cloutText = document.querySelector("#depositCloutAddress");
      cloutText.setAttribute("type", "text");
      cloutText.select();

      try {
        document.execCommand("copy");
        const copyText = document.querySelector(".copy-text");
        copyText.innerHTML = "Copied!";
      } catch (err) {}

      /* unselect the range */
      cloutText.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    },
    getExchangeRate: async function () {
      try {
        const result = await this.$axios.get(
          "http://52.58.136.147/api/v0/get-exchange-rate"
        );
        const USDCentsInBitclout = result.data.USDCentsPerBitCloutExchangeRate;
        const centsPerDollar = 100;
        this.isLoading = false;
        this.dollarPerBitclout = USDCentsInBitclout / centsPerDollar;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style>
.modal-header {
  display: block;
  position: relative;
  border: none;
  border-radius: none;
}
.modal-header h5 {
  text-align: center;
  font-size: 1.08rem;
  color: #00fff6;
}
.modal-header .close {
  position: absolute;
  top: 0.639rem;
  left: 0.8rem;
  font-size: 1.99rem;
  color: #fff;
  font-weight: 100;
}
.modal-content {
  border-radius: 1.34rem;
  background: #a7178f linear-gradient(248deg, #a7178f 0%, #2b1097 100%) 0% 0%
    no-repeat padding-box;
  border: 1px solid #b19eff;
}
h4.input-info {
  font-size: 0.998rem;
}
.form-control {
  text-align: center;
}
.form-caption {
  font-size: 1rem;
  margin-top: 0.5rem;
}
.form-caption span {
  color: #00fff6;
}
.payment-information {
  cursor: pointer;
  margin-top: 0.23rem;
  display: block;
  background: #00fff6 0% 0% no-repeat padding-box;
  border-radius: 5px;
  padding: 0.3rem;
  color: #2b1097;
}
.payment-information span {
  text-align: center;
  font-family: "SansationRegular", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Helvetica Neue", sans-serif;
  font-weight: bold;
  font-size: 0.93rem;
  letter-spacing: 0px;
  color: #2b1097;
}
.payment-information span.copy-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.payment-information span + img {
  margin-left: 0.488rem;
}
.payment-information img {
  width: 0.955rem;
  height: 0.955rem;
}
.wallet-nav-profile {
  align-items: center;
  padding: 0.188rem;
  margin-bottom: 0.65rem;
}
.wallet-nav-profile img {
  width: 1.95rem;
  height: 1.95rem;
  border: solid 0.063px #c2c1c9;
  border-radius: 50%;
}
.wallet-nav-profile span {
  font-size: 0.938rem;
  font-weight: 400;
  margin-right: 0.375rem;
  margin-left: 0.375rem;
  color: #fff;
}
@media (max-width: 27.813rem) {
  .payment-information span {
    font-size: 0.77rem;
  }
}
</style>