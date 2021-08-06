<template>
  <div class="xpdV-hero">
    <LevelOneTrophy v-if="currentLevel == 1" />
    <LevelTwoTrophy v-else-if="currentLevel == 2" />
    <LevelThreeTrophy v-else-if="currentLevel == 3" />
    <LevelFourTrophy v-else-if="currentLevel == 4" />
    <LevelFiveTrophy v-else-if="currentLevel == 5" />
    <LevelCompleteTrophy v-else-if="currentLevel == 6" />
  </div>
</template>
<script>
import LevelOneTrophy from "@/components/game/gameplay/levels-trophy/level-one-trophy";
import LevelTwoTrophy from "@/components/game/gameplay/levels-trophy/level-two-trophy";
import LevelThreeTrophy from "@/components/game/gameplay/levels-trophy/level-three-trophy";
import LevelFourTrophy from "@/components/game/gameplay/levels-trophy/level-four-trophy";
import LevelFiveTrophy from "@/components/game/gameplay/levels-trophy/level-five-trophy";
import LevelCompleteTrophy from "@/components/game/gameplay/levels-trophy/level-complete-trophy";
export default {
  components: {
    LevelOneTrophy,
    LevelTwoTrophy,
    LevelThreeTrophy,
    LevelFourTrophy,
    LevelFiveTrophy,
    LevelCompleteTrophy
  },
  props: ["currentLevel"],
};
</script>
<style lang="scss" scoped>
</style>