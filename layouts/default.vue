<template>
  <div>
    <main class="bg">
      <DesktopHeader />
      <Nuxt />
    <WalletDialogs/>
    </main>
  </div>
</template>
<script>
import DesktopHeader from "@/components/partials/desktop_header";
import WalletDialogs from "@/components/dialogs/wallet-dialogs";
export default {
  components: {
    DesktopHeader,
    WalletDialogs,
  },
};
</script>
<style>

</style>
