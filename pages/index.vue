<template>
  <div>
    <div class="bnvc-container">
      <MobileHeader />
      <div class="bnvc-wrapping">
        <a class="btn btn-info" @click="PVCGame">Play against CPU</a>
        <a class="btn btn-info" @click="PVCGameDemo">PVC Demo</a>
        <div class="container">
          <div class="mx-auto">
            <client-only>
              <WalletInfo />
              <div v-if="gameSettings">
                <GameBoard @play="PVCGame" :gameSettings="gameSettings" />
              </div>
              <Preloader v-else-if="!gameSettings" />
            </client-only>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import WalletInfo from "@/components/wallets";
import MobileHeader from "@/components/partials/mobile_header";
import NavProfile from "@/components/partials/nav-profile";
import GameBoard from "@/components/game/pvc-board";
import { DB } from "@/services/fireinit.js";
import { nodeAPIUrl } from "@/services/helpers.js";
import Preloader from "@/components/minor-preloader";
export default {
  components: {
    MobileHeader,
    GameBoard,
    NavProfile,
    Preloader,
    WalletInfo,
  },
  data() {
    return {
      gameSettings: null,
      dollarPerBitclout: null,
    };
  },
  computed: {
    user() {
      return this.$store.getters.activeUser;
    },
  },
  created() {
    this.getExchangeRate().then(() => {
      this.getPVCSettings();
    });
  },
  methods: {
    getExchangeRate: async function () {
      try {
        const result = await this.$axios.get(
          `${nodeAPIUrl}/api/v0/get-exchange-rate`
        );
        const USDCentsInBitclout = result.data.USDCentsPerBitCloutExchangeRate;
        const centsPerDollar = 100;
        this.dollarPerBitclout = USDCentsInBitclout / centsPerDollar;
      } catch (err) {
        console.log(err);
      }
    },
    getPVCSettings: async function () {
      try {
        if (!this.dollarPerBitclout) {
          return;
        }
        DB.collection("gameSettings")
          .doc("pvc-setting")
          .onSnapshot((snapshot) => {
            const data = snapshot.data();
            this.gameSettings = data;
            this.gameSettings.entryFeeInClout =
              (data.entryFee / this.dollarPerBitclout).toFixed(8);
            this.gameSettings.firstPriceInBitclout =
              (data.firstPrice / this.dollarPerBitclout).toFixed(8);
            this.gameSettings.secondPriceInBitclout =
              (data.secondPrice / this.dollarPerBitclout).toFixed(8);
            this.gameSettings.thirdPriceInBitclout =
              (data.thirdPrice / this.dollarPerBitclout).toFixed(8);
          });
      } catch (err) {
        console.log(err);
      }
    },
    PVCGameDemo: async function () {
      await this.PVCGame(true);
    },
    PVCGame: async function (isDemo = false) {
      if (this.user) {
        this.$store.commit("setFullpageLoading", true);
        try {
          const result = await this.$axios.post("/pvc/play", {
            userId: this.user.uid,
            isDemo: isDemo,
          });
          this.$store.commit("setFullpageLoading", false);
          this.$router.push("/games/" + result.data.gameId);
        } catch (err) {
          console.log(err);
          this.$store.commit("setFullpageLoading", false);
          if (err.response && err.response.data) {
            const errorMsg = err.response.data.error;
            this.$store.commit("setGlobalSiteError", errorMsg);
            this.$bvModal.show("globalErrorAlertDialog");
            return;
          }
          const errorMsg = "Request failed! Please try again.";
          this.$store.commit("setGlobalSiteError", errorMsg);
          this.$bvModal.show("globalErrorAlertDialog");
        }
      }
    },
  },
};
</script>
<style scoped>
</style>
