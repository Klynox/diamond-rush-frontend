<template>
  <div class="mvcD-game-action-section">
    <div class="mvcD-winner" v-if="isWinner">
      <div class="mvcD-winner-background"></div>
      <div class="caption">You Have Attained 'Diamond Hands'</div>
    </div>
    <div class="d-flex justify-content-center">
      <button
        type="button"
        @click="play"
        class="btn xvhM-action-btn"
        v-if="isGameOpen && !resultView"
        :disabled="isLoading || !selectedCard"
      >
        Play
      </button>
      <button
        type="button"
        @click="toLeaderboard"
        class="btn xvhM-action-btn-continue d-lg-none"
        v-if="isGameOver"
      >
        Continue
      </button>
      <button
        type="button"
        @click="continueGame"
        class="btn xvhM-action-btn"
        v-if="isGameOpen && resultView"
      >
        Continue
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
</template>
<script>
import CountDownTime from "@/components/countdown";
export default {
  props: ["user", "game", "isWinner"],
  components: {
    CountDownTime,
  },
  computed: {
    isLoading() {
      return this.$store.state.game.isLoading;
    },
    selectedCard() {
      return this.$store.state.game.selectedCard;
    },
    resultView() {
      return this.$store.state.game.showResultView;
    },
    isGameOpen() {
      return this.game.status == "ACTIVE";
    },
    isGameInactive() {
      return this.game.status == "INACTIVE";
    },
    isGameOver() {
      return this.game.status == "CLOSED";
    },
  },
  methods: {
    continueGame: function () {
      this.$store.commit("game/continueGamePlay");
    },
    play: function () {
      if (!this.user) return;
      if (this.isLoading) return;
      if (this.resultView) return;
      if (this.isGameOpen) {
        if (!this.selectedCard) return;
        this.$store.dispatch("game/playGame", {
          gameId: this.game.gameId,
          uid: this.user.uid,
          selection: this.selectedCard,
        });
      }
    },
    toLeaderboard: function () {
      this.$router.push(`/games/${this.game.gameId}/participants`);
    },
  },
};
</script>
<style scoped>
.mvcD-winner {
  height: 35px;
  width: 100%;
  position: relative;
  margin-bottom: 1rem;
}
.mvcD-winner-background {
  position: absolute;
  width: 100%;
  height: 100%;
  background: transparent linear-gradient(265deg, #00ecff 0%, #00ff6f 100%) 0%
    0% no-repeat padding-box;
  border: 1px solid #b19eff;
  border-radius: 10px;
  filter: blur(14px);
  z-index: 3;
}
.mvcD-winner .caption {
  position: relative;
  z-index: 5;
  color: #fff;
  text-align: center;
  margin-top: 7px;
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