<template>
  <div class="mx-auto col-sm-9 col-md-7 col-lg-4 mnvcD-container small-board">
    <MobileHeader class="display-mobile-flex" />
    <div class="d-flex flex-column align-items-center xpdV-hero">
      <img :src="currentLevelTrophyImage" class="xpdv-dmd" />
    </div>
    <GamePlayCardNav :game="game" />
    <div
      class="mnvcD-wrapper"
      :class="[
        {
          'mnvcD-good': selectionState == 'GOOD',
        },
        { 'mnvcD-bad': selectionState == 'BAD' },
        { 'mnvcD-good': isWinner },
      ]"
    >
      <WinnerShapes v-if="isWinner" />
      <div class="container">
        <GamePlayCardInfo />
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
            :class="{
              'pointed-cursor':
                isGameOpen && !isLoading && !$store.state.game.showResultView,
            }"
          />
        </div>
        <GamePlayBoardActions :user="user" :game="game" :isWinner="isWinner" />
      </div>
    </div>
  </div>
</template>
<script>
import { DB } from "@/services/fireinit.js";
import MobileHeader from "@/components/partials/mobile_header";
import GamePlayBoardActions from "@/components/game/gameplay/board-actions";
import GamePlayCardInfo from "@/components/game/gameplay/card-info";
import GamePlayCardNav from "@/components/game/gameplay/card-nav";
import WinnerShapes from "@/components/game/gameplay/mnvcD-winner-shapes";
export default {
  props: ["game", "gameIsClosed"],
  components: {
    MobileHeader,
    GamePlayBoardActions,
    GamePlayCardInfo,
    GamePlayCardNav,
    WinnerShapes,
  },
  data() {
    return {
      isWinner: false,
    };
  },
  unmounted() {
    this.$store.commit("game/resetGame");
  },
  computed: {
    selectionState() {
      return this.$store.state.game.selectionState;
    },
    selectedCard() {
      return this.$store.state.game.selectedCard;
    },
    user() {
      return this.$store.getters.activeUser;
    },
    isGameOpen() {
      return this.game.status == "ACTIVE";
    },
    isGameInactive() {
      return this.game.status == "INACTIVE";
    },
    currentLevelTrophyImage() {
      const currentLevel = this.$store.state.game.currentLevel;
      const levelImages = this.$store.state.game.levelImages;
      const currentLevelImageIndex = levelImages.findIndex(
        (level) => level.level == currentLevel
      );
      return levelImages[currentLevelImageIndex].image;
    },
    isLoading() {
      return this.$store.state.game.isLoading;
    },
    gameCards() {
      if (this.isGameInactive) {
        return this.$store.state.game.defaultGameCards;
      } else if (this.isGameOpen && this.selectedCard) {
        return this.$store.state.game.selectedGameCards;
      } else if (this.isGameOpen && this.$store.state.game.showResultView) {
        return this.$store.state.game.selectionResultCards;
      } else {
        if (this.$store.state.game.showResultView) {
          return this.$store.state.game.selectionResultCards;
        }
        return this.$store.state.game.defaultGameCards;
      }
    },
  },
  created() {
    if (this.user && this.game) {
      DB.collection("gameParticipants")
        .where("gameId", "==", this.game.gameId)
        .where("userId", "==", this.user.uid)
        .onSnapshot((snapshot) => {
          if (!snapshot.empty) {
            const snapshotData = snapshot.docs[0].data();
            if (snapshotData.isWinner && snapshotData.isWinner == true) {
              const payload = {
                cards: snapshotData.cards,
                selectedCard: snapshotData.selection,
              };
              this.$store.commit("game/setResultCards", payload);
              this.isWinner = true;
            }
            this.$store.commit("game/setLevel", snapshotData.currentLevel);
          }
        });
    }
  },
  methods: {
    selectCard: function (selectedCardId) {
      if (!this.user) return;
      if (this.isLoading) return;
      if (this.$store.state.game.showResultView) return;
      if (this.isGameOpen) {
        this.$store.commit("game/selectLevel", selectedCardId);
      }
    },
  },
};
</script>
<style scoped>
.mnvcD-good {
  background: transparent linear-gradient(180deg, #2b1097 0%, #00fff6 100%) 0%
    0% no-repeat padding-box;
}
.mnvcD-bad {
  background: transparent linear-gradient(180deg, #2b1097 0%, #ff0000 100%) 0%
    0% no-repeat padding-box;
}
.pointed-cursor {
  cursor: pointer;
}
</style>