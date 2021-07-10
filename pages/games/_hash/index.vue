<template>
  <div class="container-pc">
    <div class="d-flex flex-row justify-content-between">
      <div class="col-lg-4 mx-auto d-none d-lg-block">
        <ParticipantsBoard />
      </div>
      <GamePlayBoard />
      <div
        class="
          col-lg-4
          d-none d-lg-flex
          mx-auto
          flex-column
          align-items-center
          justify-content-center
          text-center
          diamond-hands-notice
        "
      >
        <h1 v-if="gameOver" class="active">MVP</h1>
        <img
          class="my-4 mx-auto hands-image"
          :src="
            gameOver
              ? '/images/levels/complete-clean.svg'
              : '/images/inactive-diamon-hands.svg'
          "
          alt="Diamond Hands"
        />
        <h1 v-if="!gameOver">Be the 1st to attain "Diamond Hands"</h1>
        <div class="mt-4" v-else>
          <img src="/images/profile-placeholder-bhl.png" class="mb-2 profile-image" alt="Ugochukwu"/>
          <h3>@chukwudifu</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GamePlayBoard from "@/components/game/gameplay-board";
import ParticipantsBoard from "@/components/game/participants-board";
export default {
  components: {
    GamePlayBoard,
    ParticipantsBoard,
  },
  data() {
    return {
      gameOver: true,
    };
  },
};
</script>
<style scoped>
</style>