<template>
  <div class="mx-auto board-wrapper">
    <h3>Prize: 0.59 $Clout ≈ $100 USD</h3>
    <hr class="col-9 mx-auto" />
    <div class="text-center sm-heading">Winner takes it all</div>
    <h4 class="board-info">Participants <span>11/11</span></h4>
    <Participant
      v-for="(participant, index) in participants"
      :participant="participant"
      :key="index"
      :index="++index"
    />
  </div>
</template>
<script>
import Participant from "@/components/game/participant";
export default {
  components: {
    Participant,
  },
  data() {
    return {
      participants: [
        { isWinner: true },
        { isWinner: false },
        { isWinner: false },
        { isWinner: false },
        { isWinner: false },
        { isWinner: false },
        { isWinner: false },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.board-wrapper {
  background: #a7178f linear-gradient(343deg, #a7178f 0%, #2b1097 100%) 0%
    0% no-repeat padding-box;
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