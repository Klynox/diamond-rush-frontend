<template>
  <div class="mx-auto col-sm-9 col-md-7 col-lg-4 mnvcD-container small-board">
    <MobileHeader class="display-mobile-flex" />
    <div class="d-flex flex-column align-items-center xpdV-hero">
      <img :src="currentLevelTrophyImage" class="xpdv-dmd" />
    </div>
    <div
      class="
        d-flex
        flex-row
        justify-content-between
        container-fluid
        align-items-end
        hxdp-info
      "
    >
      <span
        ><strong>Prize:</strong><br />{{ game.price }} $Clout &dollar;{{
          game.priceInDollar
        }}
        USD</span
      >
      <span><strong>Battle Royale</strong></span>
      <span>
        <nuxt-link to="/games/1/participants" class="display-mobile"
          >{{ game.numParticipants }}/{{ game.expectedParticipants }} Players
          <img class="icon" src="/images/xhbmW-arrow-dropdown.svg"
        /></nuxt-link>
        <span class="display-pc"
          >{{ game.numParticipants }}/{{
            game.expectedParticipants
          }}
          Players</span
        >
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
            :class="{ 'pointed-cursor': isGameOpen }"
          />
        </div>
        <div class="d-flex justify-content-center mvcD-game-action-section">
          <button
            type="button"
            @click="play"
            class="btn xvhM-action-btn"
            v-if="isGameOpen"
          >
            Play
          </button>
          <div
            v-if="isGameInactive"
            class="d-flex flex-column mvnK-action-btn-info"
          >
            <span>Game starts in</span>
            <span
              ><span class="action-countdown"
                ><CountDownTime :countdownTime="game.endsAt.toDate()" /></span
              ><span>min(s)</span></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CountDownTime from "@/components/countdown";
import WalletInfo from "@/components/wallets";
import MobileHeader from "@/components/partials/mobile_header";
import NavProfile from "@/components/partials/nav-profile";
export default {
  props: ["game", "gameIsClosed"],
  components: {
    MobileHeader,
    NavProfile,
    WalletInfo,
    CountDownTime,
  },
  data() {
    return {
      selectedCard: null,
    };
  },
  computed: {
    isGameOpen() {
      return this.game.status == "ACTIVE";
    },
    isGameInactive() {
      return this.game.status == "INACTIVE";
    },
    currentLevelTrophyImage() {
      const currentImageIndex = this.$store.state.game.currentLevel;
      return this.$store.state.game.levelImages[currentImageIndex];
    },
    gameCards() {
      if (this.isGameInactive) {
        return this.$store.state.game.defaultGameCards;
      } else if (this.isGameOpen && this.selectedCard) {
        return this.$store.state.game.selectedGameCards;
      }else {
        return this.$store.state.game.defaultGameCards;
      }
    },
  },
  methods: {
    selectCard: function (selectedCardId) {
      if (this.isGameOpen) {
        this.$store.commit("game/selectLevel", selectedCardId);
        this.selectedCard = selectedCardId;
      }
    },
    play: function () {
      if (this.isGameOpen) {
        if (!this.selectedCard) return;
        this.$store.commit("game/moveLevel");
      }
    },
  },
};
</script>
<style scoped>
.pointed-cursor {
  cursor: pointer;
}
.mvnK-action-btn-info span {
  text-align: left;
  line-height: 1.38rem;
  letter-spacing: 0px;
  color: #f19de3;
}
.mvnK-action-btn-info.left span {
  text-align: right;
}
.mvnK-action-btn-info .action-countdown * {
  font-size: 0.86rem;
  font-weight: bold;
  margin-right: 0.313rem;
  color: #00fff6;
}
</style>