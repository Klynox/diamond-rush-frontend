<template>
  <div class="mx-auto board-wrapper">
    <h3 v-if="game.gameType == 'PVP'">
      Prize: &dollar;{{ gamePriceInDollar }} USD ≈ {{ gamePrice }} &dollar;Clout
    </h3>
    <hr class="col-9 mx-auto" v-if="game.gameType == 'PVP'" />
    <div class="text-center sm-heading" v-if="game.gameType == 'PVP'">
      Winner takes it all
    </div>
    <h4 class="board-info" v-if="game.gameType == 'PVP'">
      Participants
      <span>{{ game.numParticipants }}/{{ game.expectedParticipants }}</span>
    </h4>
    <PVCGamePrizes
      style="margin-bottom: 20px"
      class="small-prize"
      :settings="gameSettings"
      v-if="game.gameType == 'PVC' && gameSettings"
    />
    <Participant
      v-if="game.gameType == 'PVP'"
      v-for="(participant, index) in participants"
      :participant="participant"
      :gameIsClosed="gameIsClosed"
      :price="game.price"
      :isFinalized="game.finalized"
      :key="index"
      :index="++index"
    />
    <PVCParticipant
      v-else
      v-for="(participant, index) in participants"
      :participant="participant"
      :gameIsClosed="gameIsClosed"
      :price="game.price"
      :isFinalized="game.finalized"
      :key="index"
      :index="++index"
    />
  </div>
</template>
<script>
import { DB } from "@/services/fireinit.js";
import Participant from "@/components/game/participant";
import PVCParticipant from "@/components/game/pvc-participant";
import PVCGamePrizes from "@/components/game/pvc-gameprizes";
export default {
  props: ["game", "gameIsClosed"],
  components: {
    Participant,
    PVCGamePrizes,
    PVCParticipant,
  },
  data() {
    return {
      participants: [],
      gameSettings: null,
      dollarPerBitclout: null,
    };
  },
  created() {
    this.getExchangeRate().then(() => {
      this.getPVCSettings();
    });
    this.getGameParticipants();
  },
  computed: {
    gamePrice() {
      if (this.game.numParticipants < 1) {
        return 0;
      }
      const commision =
        ((this.game.numParticipants * this.game.entryFee) / 100) *
        this.game.commission;
      return (this.game.entryFee * this.game.numParticipants - commision) * 100;
    },
    gamePriceInDollar() {
      if (!this.dollarPerBitclout) return 0;
      return (this.gamePrice / this.dollarPerBitclout).toFixed(8);
    },
  },
  methods: {
    getExchangeRate: async function () {
      try {
        const result = await this.$axios.get(
          `/get-clout-price`
        );
        const USDCentsInBitclout = result.data.USDCentsPerBitCloutExchangeRate;
        const centsPerDollar = 100;
        this.dollarPerBitclout = USDCentsInBitclout / centsPerDollar;
      } catch (err) {
        console.log(err);
      }
    },
    getGameParticipants: function () {
      DB.collection("gameParticipants")
        .where("gameId", "==", this.game.gameId)
        .orderBy("position", "asc")
        .orderBy("isWinner", "desc")
        .onSnapshot((querySnapshot) => {
          var participants = [];
          querySnapshot.forEach(async (doc) => {
            const data = doc.data();
            participants.push(data);
          });

          this.participants = participants;
        });
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
            this.gameSettings.entryFeeInClout = (
              data.entryFee / this.dollarPerBitclout
            ).toFixed(8);
            this.gameSettings.firstPriceInBitclout = (
              data.firstPrice / this.dollarPerBitclout
            ).toFixed(8);
            this.gameSettings.secondPriceInBitclout = (
              data.secondPrice / this.dollarPerBitclout
            ).toFixed(8);
            this.gameSettings.thirdPriceInBitclout = (
              data.thirdPrice / this.dollarPerBitclout
            ).toFixed(8);
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.board-wrapper {
  background: #a7178f linear-gradient(343deg, #a7178f 0%, #2b1097 100%) 0% 0%
    no-repeat padding-box;
  border: 1px solid #b19eff;
  border-radius: 20px;
  width: 95%;
  min-height: 31rem;
  padding: 2.4rem 1rem 1.5rem;
  .sm-heading {
    font-size: 0.92rem;
    color: #fff;
  }
  h3 {
    text-align: center;
    font-size: 1.3rem;
    font-weight: bold;
    letter-spacing: 0px;
    color: #00fff6;
  }
  .board-info {
    margin-left: 1.2rem;
    margin-bottom: 1.7rem;
    margin-top: 1.3rem;
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 0;
    span {
      margin-left: 0.5rem;
      color: #00fff6;
    }
  }
}
</style>