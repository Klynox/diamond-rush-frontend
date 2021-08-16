<template>
  <div>
    <main class="bg">
      <DesktopHeader />
      <Nuxt />
      <WalletDialogs />
      <AuthDialogs />
    </main>
  </div>
</template>
<script>
import DesktopHeader from "@/components/partials/desktop_header";
import WalletDialogs from "@/components/dialogs/wallet-dialogs";
import AuthDialogs from "@/components/dialogs/auth/index";
import { Howl } from "howler";
export default {
  components: {
    DesktopHeader,
    WalletDialogs,
    AuthDialogs,
  },
  created() {
    var sound = new Howl({
      src: ["/sounds/bg-rpclip.mp3"],
      autoplay: true,
      loop: true,
      volume: 0.5,
    });
    sound.play();
  },
};
</script>
<style>
</style>
