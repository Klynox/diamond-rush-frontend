<template>
  <div>
    <main class="bg">
      <DesktopHeader />
      <Nuxt />
    <WalletDialogs/>
    <AuthDialogs/>
    </main>
  </div>
</template>
<script>
import DesktopHeader from "@/components/partials/desktop_header";
import WalletDialogs from "@/components/dialogs/wallet-dialogs";
import AuthDialogs from "@/components/dialogs/auth/index";
export default {
  components: {
    DesktopHeader,
    WalletDialogs,
    AuthDialogs
  },
};
</script>
<style>

</style>
