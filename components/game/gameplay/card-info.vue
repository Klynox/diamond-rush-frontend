<template>
  <div>
    <h3 class="mnvcD-heading" v-if="!resultView">
      Open the right chest to win
    </h3>
    <h3
      class="mx-auto col-9 mnvcD-heading-result-bad"
      v-else-if="resultView && selectionState == 'BAD'"
    >
      <span v-if="selectionStateType == 'FUD'"
        >ooppss... repeat this level</span
      >
      <span v-if="selectionStateType == 'PAPER_HANDS'"
        >oouuchh... go back to level 1</span
      >
    </h3>
    <h3
      class="mx-auto col-9 mnvcD-heading-result-good"
      v-else-if="resultView && selectionState == 'GOOD'"
    >
      <span v-if="currentLevel == 6">Bitclout to the Moon</span>
      <span v-else-if="selectionStateType == 'HODL'"
        >Congratulations HODLER</span
      >
      <span v-else-if="selectionStateType == 'MOON'"
        >Awesome... skip the next level</span
      >
    </h3>
  </div>
</template>

<script>
export default {
  computed: {
    currentLevel(){
      return this.$store.state.game.currentLevel;
    },
    selectionState() {
      return this.$store.state.game.selectionState;
    },
    resultView() {
      return this.$store.state.game.showResultView;
    },
    selectionStateType() {
      return this.$store.state.game.selectionStateType;
    },
  },
};
</script>
<style scoped>
.mnvcD-heading-result-good {
  text-align: center;
  font-size: 0.83rem;
  color: #fff;
  margin-bottom: 1.8rem;
  padding: 7px 15px;
  border: 1px solid #00fff6;
  border-radius: 12px;
}
.mnvcD-heading-result-bad {
  text-align: center;
  font-size: 0.83rem;
  color: #fff;
  margin-bottom: 1.8rem;
  padding: 7px 15px;
  border: 1px solid #ffffff;
  border-radius: 12px;
}
.mvnK-action-btn-info span {
  text-align: left;
  line-height: 1.38rem;
  letter-spacing: 0px;
  color: #f19de3;
}
</style>