<template>
  <div class="container-pc">
    <div
      class="d-flex flex-row justify-content-between"
      v-if="!isPageLoading && !gameError"
    >
      <div class="other-smaller-board mx-auto d-none d-lg-block">
        <ParticipantsBoard v-if="game" :game="game" :gameIsClosed="gameIsClosed" />
      </div>
      <GamePlayBoard v-if="game" :game="game" :gameIsClosed="gameIsClosed" />
      <div
        class="
          other-smaller-board
          d-none d-lg-flex
          mx-auto
          flex-column
          align-items-center
          justify-content-center
          text-center
          diamond-hands-notice
        "
      >
        <h1 v-if="gameIsClosed" class="active">MVP</h1>
        <img
          class="my-4 mx-auto hands-image"
          :src="
            gameIsClosed
              ? '/images/levels/complete-clean.svg'
              : '/images/inactive-diamon-hands.svg'
          "
          alt="Diamond Hands"
        />
        <h1 v-if="!gameIsClosed">Be the 1st to attain "Diamond Hands"</h1>
        <div class="mt-4" v-else>
          <img
            src="/images/profile-placeholder-bhl.png"
            class="mb-2 profile-image"
            alt="Ugochukwu"
          />
          <h3>@chukwudifu</h3>
        </div>
      </div>
    </div>
    <Preloader v-else-if="isPageLoading" />
    <PageErrorCard v-else-if="!isPageLoading && gameError">
      {{ gameError }}
    </PageErrorCard>
  </div>
</template>
<script>
import { DB } from "@/services/fireinit.js";
import GamePlayBoard from "@/components/game/gameplay/board";
import Preloader from "@/components/preloader";
import PageErrorCard from "@/components/cards/page-error-card";
import ParticipantsBoard from "@/components/game/participants-board";
export default {
  validate: async function ({ params, store }) {
    const querySnapshot = await DB.collection("games").doc(params.hash).get();
    return querySnapshot.exists;
  },
  computed: {
    isPageLoading() {
      return this.$store.getters.pageLoading;
    },
    user() {
      return this.$store.getters.activeUser;
    },
    gameIsClosed() {
      if (this.game) {
        return this.game.status == "CLOSED";
      }
    },
  },
  components: {
    GamePlayBoard,
    ParticipantsBoard,
    Preloader,
    PageErrorCard,
  },
  data() {
    return {
      game: null,
      gameError: null,
    };
  },
  created() {
    this.$store.commit('game/resetGame');
    if (this.user) {
      this.enterGame(this.user.uid);
    }
  },
  methods: {
    isCanceled(status){
      return status == 'CANCELED';
    },
    async enterGame(userUid) {
      this.gameError = null;
      try {
        await this.$axios.post("/open-game/" + this.$route.params.hash, {
          userId: userUid,
        });
        this.$store.commit("setPageLoader", false);
        DB.collection("games")
          .doc(this.$route.params.hash)
          .onSnapshot((querySnapshot) => {
            this.game = querySnapshot.data();
            console.log(this.game);
            this.game.gameId = querySnapshot.id;
            if(this.isCanceled(this.game.status)){
              this.gameError = 'Sorry, this game has been canceled.';
            }
          });
      } catch (err) {
        this.$store.commit("setPageLoader", false);
        if (err.response) {
          this.gameError = err.response.data.error;
          return;
        }
        this.gameError = "Request failed! Please try again.";
      }
    },
  },
};
</script>
<style scoped>
.other-smaller-board {
  width: 30rem;
  max-width: 33.333333%;
}
</style>