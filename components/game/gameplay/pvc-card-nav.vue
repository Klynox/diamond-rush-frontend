<template>
  <div
    class="
      d-flex
      flex-row
      justify-content-between
      container-fluid
      align-items-end
      hxdp-info
    "
  >
    <span v-if="game.status == 'ACTIVE'">Your Time: {{ countDown }}</span>
    <span v-else>Your Time{{ game.gameplayDuration }} secs</span>
    <span>
      <nuxt-link
        :to="`/games/${game.gameId}/participants`"
        class="display-mobile"
        >1/1 Players <img class="icon" src="/images/xhbmW-arrow-dropdown.svg"
      /></nuxt-link>
      <span class="display-pc">1/1 Players</span>
    </span>
  </div>
</template>
<script>
import { setTimeZone } from "@/services/luxon.js";
export default {
  props: ["game", "eventbus"],
  data() {
    return {
      timeinterval: null,
      secondsSpan: 0,
    };
  },
  computed: {
    gameCountDownTime() {
      return setTimeZone(new Date(this.game.isGameStarted.toDate()).getTime());
    },
    countDown() {
      if (!this.game) return "0 secs";
      return `${this.secondsSpan} secs`;
    },
  },
  mounted() {
    this.eventbus.$on("activateGame", this.initializeClock);
  },
  methods: {
    getTimeRemaining(endtime) {
      var t = Date.parse(new Date()) - Date.parse(endtime);
      return {
        total: t,
        seconds: Math.floor(t / 1000),
      };
    },
    initializeClock() {
      this.updateClock();
      this.timeinterval = setInterval(this.updateClock, 1000);
    },
    updateClock() {
      var t = this.getTimeRemaining(this.gameCountDownTime);
      this.secondsSpan = t.seconds;

      if (t.total <= 0) {
        clearInterval(this.timeinterval);
      }
    },
  },
};
</script>