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
                v-if="activeGame"
                :game="activeGame"
              />
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
      activeGame: null,
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
    this.getOpenGames();
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
            gameData.isActive = true;
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
    getOpenGames: async function () {
      DB.collection("gameParticipants")
        .where("isOver", "==", false)
        .onSnapshot((participantSnapshot) => {
          if (!participantSnapshot.empty) {
            participantSnapshot.forEach((result) => {
              const participantGameData = result.data();
              DB.collection("games")
                .doc(participantGameData.gameId)
                .onSnapshot((gameSnapshot) => {
                  if (gameSnapshot.exists) {
                    const gameData = gameSnapshot.data();
                    if (
                      gameData.status == "ACTIVE"
                    ) {
                      gameData.gameId = gameSnapshot.id;
                      gameData.isParticipant = true;
                      gameData.isActive = true;
                      this.activeGame = gameData;
                    }
                  }
                });
            });
          }
        });
    },
  },
};
</script>
<style scoped>
</style>
