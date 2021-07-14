<template>
  <span>{{ countDown }}</span>
</template>

<script>
export default {
  name: "CountDownTime",
  props: ["countdownTime"],
  data() {
    return {
      timeinterval: null,
      daysSpan: null,
      hoursSpan: null,
      minutesSpan: null,
      secondsSpan: null,
    };
  },
  computed: {
    countDown() {
      if (new Date(this.countdownTime) > new Date()) {
        return `${this.minutesSpan}:${this.secondsSpan}`;
      }
      return "00:00";
    },
  },
  mounted() {
    this.initializeClock();
  },
  methods: {
    getTimeRemaining(endtime) {
      var t = Date.parse(endtime) - Date.parse(new Date());
      var seconds = Math.floor((t / 1000) % 60);
      var minutes = Math.floor((t / 1000 / 60) % 60);
      var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      var days = Math.floor(t / (1000 * 60 * 60 * 24));
      return {
        total: t,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      };
    },
    initializeClock() {
      this.updateClock();
      this.timeinterval = setInterval(this.updateClock, 1000);
    },
    updateClock() {
      var t = this.getTimeRemaining(this.countdownTime);
      this.daysSpan = t.days;
      this.hoursSpan = ("0" + t.hours).slice(-2);
      this.minutesSpan = ("0" + t.minutes).slice(-2);
      this.secondsSpan = ("0" + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(this.timeinterval);
      }
    },
  },
};
</script>

<style scoped>
</style>