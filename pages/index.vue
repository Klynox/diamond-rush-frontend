<template>
  <div>
    <div class="bnvc-container">
      <MobileHeader />
      <div class="bnvc-wrapping">
        <div class="container">
          <div class="mx-auto">
            <client-only>
              <WalletInfo />
              <GameBoard
                v-for="(game, index) in games"
                :game="game"
                :key="index"
              />
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
import GameBoard from "@/components/game/gameboard";
import { DB } from "@/services/fireinit.js";
export default {
  components: {
    MobileHeader,
    GameBoard,
    NavProfile,
    WalletInfo,
  },
  data() {
    return {
      games: [],
    };
  },
  computed: {
    user() {
      return this.$store.getters.activeUser;
    },
  },
  created() {
    this.getGames();
  },
  methods: {
    checkForParticipation: async function (gameId) {
      try {
        await this.$axios.post("/check-participant/" + gameId, {
          userId: this.user.uid,
        });
        return true;
      } catch (err) {
        return false;
      }
    },
    loadGames: async function (gamesSnapshot) {
      var games = [];
      gamesSnapshot.forEach(async (doc) => {
        const gameData = doc.data();
        gameData.gameId = doc.id;
        gameData.isParticipant = false;
        if (this.user) {
          if (await this.checkForParticipation(doc.id)) {
            gameData.isParticipant = true;
          }
        }
        games.push(gameData);
      });

      this.games = games;
    },
    getGames: async function () {
      try {
        DB.collection("games")
          .where("status", "==", "INACTIVE")
          .onSnapshot(this.loadGames);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style scoped>
</style>
