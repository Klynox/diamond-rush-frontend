<template>
  <div>
    <div class="bnvc-container">
      <MobileHeader/>
      <div class="bnvc-wrapping">
        <div class="container">
          <div class="mx-auto">
            <WalletInfo/>
            <GameBoard></GameBoard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WalletInfo from '../components/wallets';
import MobileHeader from "../components/partials/mobile_header";
import NavProfile from "../components/partials/nav-profile";
import GameBoard from "../components/game/gameboard";
export default {
  components: {
    MobileHeader,
    GameBoard,
    NavProfile,
    WalletInfo
  },
};
</script>
<style scoped>
</style>
