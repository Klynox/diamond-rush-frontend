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
      <span
        ><strong>Prize:</strong><br />{{ game.price }} $Clout &dollar;{{
          game.priceInDollar
        }}
        USD</span
      >
      <span><strong>Battle Royale</strong></span>
      <span>
        <nuxt-link :to="`/games/${game.gameId}/participants`" class="display-mobile"
          >{{ game.numParticipants }}/{{ game.expectedParticipants }} Players
          <img class="icon" src="/images/xhbmW-arrow-dropdown.svg"
        /></nuxt-link>
        <span class="display-pc"
          >{{ game.numParticipants }}/{{
            game.expectedParticipants
          }}
          Players</span
        >
      </span>
    </div>
</template>
<script>
export default {
    props: ['game']
}
</script>