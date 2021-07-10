<template>
  <div class="mx-auto col-sm-9 col-md-7 col-lg-4 mnvcD-container small-board">
    <MobileHeader class="display-mobile-flex" />
    <div class="d-flex flex-column align-items-center xpdV-hero">
      <img :src="currentLevelImage" class="xpdv-dmd" />
    </div>
    <div
      class="
        d-flex
        flex-roŹ
        justify-content-between
        container-fluid
        align-items-end
        hxdp-info
      "
    >
      <span><strong>Prize:</strong><br />0.5714 $Clout $100 USD</span>
      <span><strong>Battle Royale</strong></span>
      <span>
        <nuxt-link to="/games/1/participants" class="display-mobile"
          >4/11 Players
          <img class="icon" src="/images/xhbmW-arrow-dropdown.svg"
        /></nuxt-link>
        <span class="display-pc">4/11 Players</span>
      </span>
    </div>
    <div class="mnvcD-wrapper">
      <div class="container">
        <h3 class="mnvcD-heading">Open the right chest to win</h3>
        <div class="row">
          <img
            :src="card.image"
            alt="Game Card"
            v-for="(card, index) in gameCards"
            :key="index"
            @click="selectCard(card.id)"
            class="
              col-6
              d-flex
              align-item-center
              justify-content-center
              mvcD-game-card
            "
          />
        </div>
        <div class="d-flex justify-content-center mvcD-game-action-section">
          <button type="button" @click="play" class="btn xvhM-action-btn">
            Play
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import WalletInfo from "@/components/wallets";
import MobileHeader from "@/components/partials/mobile_header";
import NavProfile from "@/components/partials/nav-profile";
export default {
  components: {
    MobileHeader,
    NavProfile,
    WalletInfo,
  },
  data() {
    return {
      selectedCard: null,
    };
  },
  computed: {
    currentLevelImage() {
      const currentImageIndex = this.$store.state.game.currentLevel;
      return this.$store.state.game.levelImages[currentImageIndex];
    },
    gameCards() {
      return this.$store.state.game.gameCards;
    },
  },
  methods: {
    selectCard: function(selectedCard){
      this.selectedCard = selectedCard;
    },
    play: function () {
      if(!this.selectedCard) return;
      this.$store.commit("game/moveLevel");
    },
  },
};
</script>
<style scoped>
</style>