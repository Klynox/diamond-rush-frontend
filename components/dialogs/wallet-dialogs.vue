<template>
  <div>
    <b-modal hide-footer id="depositDialog" title="Quick Deposit">
      <div class="d-block text-center">
        <div class="form-caption">
          Send <span>0.3 $CLout ≈ $20 USD</span> to this public key
        </div>
        <div
          class="col-11 mx-auto payment-information"
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
      <div class="d-block text-center">
        <h4 class="input-info">Enter amount to withdraw</h4>
        <div class="form-group d-flex col-9 col-sm-8 mx-auto">
          <input
            type="tel"
            placeholder="20.00"
            v-model="depositForm.amount"
            class="form-control"
          />
          <label
            class="text-center"
            style="line-height: 3; margin-left: 0.43rem"
            >USD</label
          >
        </div>
        <div
          class="
            d-flex
            flex-row
            align-items-center
            justify-content-center
            wallet-nav-profile
          "
        >
          <img src="/images/profile-placeholder-bhl.png" alt="Ugochukwu" />
          <span>Ugochukwu</span>
        </div>
        <button class="btn col-5 mx-auto payment-information" type="submit">
          <span>Withdraw</span>
        </button>
      </div>
    </b-modal>
    <b-modal hide-footer id="insufficientBalanceAlertDialog" title="Balance Alert">
      <div class="d-block text-center">
        <div class="form-caption">
          You do not sufficient balance to play this game.<br/>
          Fund your gaming account by sending Bitclout to this public key to be able to participate.
        </div>
        <div
          class="col-11 mx-auto payment-information"
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
export default {
  data() {
    return {
      depositCloutAddress: "BClY732hidwxbuwubd8byuwfybdujdjjajrfjbvhb",
      depositForm: {
        amount: null,
      },
    };
  },
  methods: {
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