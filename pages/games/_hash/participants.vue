<template>
  <div class="mx-auto col-sm-9 col-md-7 col-lg-4 mnvcD-container small-board">
    <MobileHeader class="display-mobile-flex" />
    <div class="mnvcD-wrapper">
      <div class="container">
        <img
          src="/images/bml-back.svg"
          alt="backward button"
          class="backward-nav"
          @click="navigate"
        />
        <h3 class="mnvcD-heading">Players</h3>
        <client-only>
          <ParticipantsBoard
            v-if="!pageLoading"
            :game="game"
            :gameIsClosed="gameIsClosed"
          />
        </client-only>
      </div>
    </div>
  </div>
</template>
<script>
import { DB } from "@/services/fireinit.js";
import MobileHeader from "@/components/partials/mobile_header";
import ParticipantsBoard from "@/components/game/participants-board";
export default {
  validate: async function ({ params, store }) {
    const querySnapshot = await DB.collection("games").doc(params.hash).get();
    return querySnapshot.exists;
  },
  data() {
    return {
      game: null,
      pageLoading: true,
    };
  },
  computed: {
    user() {
      return this.$store.getters.activeUser;
    },
    gameIsClosed() {
      if (this.game) {
        return this.game.status == "CLOSED";
      }
    },
  },
  created() {
    if (this.user) {
      this.checkGame();
    }
  },
  methods: {
    isCanceled(status) {
      return status == "CANCELED";
    },
    goBack() {
      this.$router.go(-1);
    },
    navigate() {
      if (this.gameIsClosed) {
        $router.push("/");
        return;
      }
      this.goBack();
    },
    checkForParticipation: async function (gameId) {
      try {
        this.$axios.post("/check-participant/" + gameId, {
          userId: this.user.uid,
        });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    async checkGame() {
      try {
        if (!(await this.checkForParticipation(this.$route.params.hash))) {
          this.goBack();
        }
        DB.collection("games")
          .doc(this.$route.params.hash)
          .onSnapshot((querySnapshot) => {
            this.game = querySnapshot.data();
            this.game.gameId = querySnapshot.id;
            this.pageLoading = false;
            if (this.isCanceled(this.game.status)) {
              this.goBack();
            }
          });
      } catch (err) {
        this.goBack();
      }
    },
  },
  components: {
    MobileHeader,
    ParticipantsBoard,
  },
};
</script>
<style scoped>
.mnvcD-wrapper {
  margin-top: 2rem !important;
}
.mnvcD-heading {
  font-size: 0.99rem;
  font-weight: bold;
  color: #00fff6;
  margin-top: 0.69rem;
  margin-bottom: 2rem;
}
.backward-nav {
  width: 1.04rem;
  height: 1.04rem;
  cursor: pointer;
}
</style>