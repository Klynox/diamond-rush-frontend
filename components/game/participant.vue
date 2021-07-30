<template>
  <div
    class="d-flex flex-row justify-content-between participant-wrapper"
    :class="{ 'is-winner': participant.isWinner }"
  >
    <span class="col-1">{{ index }}</span>
    <div class="col-11">
      <div class="d-flex flex-row justify-content-between align-items-center">
        <div class="d-flex flex-column">
          <div class="d-flex flex-row profile">
            <img :src="participant.profileImage" alt="Ugochukwu" />
            <span>{{participant.username}}</span>
          </div>
          <span class="knvm-title" v-if="gameIsClosed && participant.isWinner">Won <span class="knvm-output" :class="{ 'active': participant.isWinner }">{{price}} $Clout</span></span>
          <span class="knvm-title" v-else>Won <span class="knvm-output">0 $Clout</span></span>
          <span class="knvm-title" v-if="gameIsClosed">Number of tries <span class="knvm-output" :class="{ 'active': participant.isWinner }">{{participant.retries}}</span></span>
          <span class="knvm-title" v-else>Number of tries <span class="knvm-output">0</span></span>
          <span class="knvm-title" v-if="gameIsClosed && isFinalized">All Time High <span class="knvm-output" :class="{ 'active': participant.isWinner }">Lv {{participant.highestLevel == 6 ? 5 : participant.highestLevel}}</span></span>
          <span class="knvm-title" v-else>All Time High <span class="knvm-output"></span></span>
          <span class="knvm-title" v-if="gameIsClosed && isFinalized">ATH Best Time <span class="knvm-output" :class="{ 'active': participant.isWinner }">{{participant.highestLevelTime}} secs</span></span>
          <span class="knvm-title" v-else>ATH Best Time <span class="knvm-output"></span></span>
        </div>
        <img
          src="/images/levels/complete-clean.svg"
          v-if="participant.isWinner"
          class="winner-badge"
        />
      </div>
      <hr class="sm" />
    </div>
  </div>
</template>
<script>
export default {
  props: ["participant", "index", "gameIsClosed", "price", "isFinalized"],
};
</script>
<style lang="scss" scoped>
.participant-wrapper {
  padding: 0.3rem;
  position: relative;
  & + .participant-wrapper {
    margin-top: 0.69rem;
  }
  &.is-winner {
    color: #00fff6;
  }
  .winner-badge {
    width: 2.22rem;
    height: 2.22rem;
  }
  .profile {
    align-items: center;
    padding: 0.188rem;
    img {
      width: 1.75rem;
      height: 1.75rem;
      border: solid 0.063px #c2c1c9;
      border-radius: 50%;
    }
    span {
      font-size: 0.818rem;
      font-weight: 400;
      margin-right: 0.375rem;
      margin-left: 0.375rem;
    }
  }
  .knvm-output {
    color: #fff;
    &.active {
      color: #00fff6;
    }
  }
  .knvm-title {
    font-size: 0.798rem;
    color: #D384CF;
  }
}
</style>