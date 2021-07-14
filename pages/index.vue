<template>
  <div>
    <div class="bnvc-container">
      <MobileHeader />
      <div class="bnvc-wrapping">
        <div class="container">
          <div class="mx-auto">
            <WalletInfo />
            <GameBoard v-for="(game, index) in games" :game="game" :key="index"/>
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
  created() {
    this.getGames();
  },
  methods: {
    getGames: async function () {
      try {
        DB.collection("games")
          .where("status", "==", "INACTIVE")
          .onSnapshot((gamesSnapshot) => {
            var games = [];
            gamesSnapshot.forEach((doc) => {
              const gameData = doc.data();
              gameData.gameId = doc.id;
              games.push(gameData);
            });
            this.games = games;
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style scoped>
</style>
