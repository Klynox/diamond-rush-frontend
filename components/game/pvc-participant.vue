<template>
  <div
    class="d-flex flex-row justify-content-between participant-wrapper"
    :class="{ 'is-winner': participant.isWinner }"
  >
    <div class="col-11">
      <div class="d-flex flex-row justify-content-between align-items-center">
        <div class="d-flex flex-column">
          <div class="d-flex flex-row profile">
            <img :src="participant.profileImage" alt="Ugochukwu" />
            <span>{{participant.username}}</span>
          </div>
          <span class="knvm-title" v-if="gameIsClosed">Your Time <span class="knvm-output" :class="{ 'active': participant.isWinner }">{{participant.gameplayDuration}} secs</span></span>
          <span class="knvm-title" v-else>Your Time <span class="knvm-output">0</span></span>
          <span class="knvm-title" v-if="gameIsClosed">Number of tries <span class="knvm-output" :class="{ 'active': participant.isWinner }">{{participant.retries}}</span></span>
          <span class="knvm-title" v-else>Number of tries <span class="knvm-output">0</span></span>
        </div>
        <span class="won-text" v-if="participant.isWinner">Won</span>
      </div>
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
  padding: 1rem 0.3rem;
  position: relative;
  background: #a7178f linear-gradient(343deg, #a7178f 0%, #2b1097 100%) 0% 0%
    no-repeat padding-box;
  border: 1px solid #b19eff;
  border-radius: 13px;
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
  .won-text {
      font-size: 14px;
      color: #00fff6;
  }
}
</style>