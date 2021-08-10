<template>
  <div>
    <b-modal hide-footer id="signInDialog" title="Sign In">
      <SignIn v-on:googleSignIn="googleSignIn" v-on:setWallet="setWallet" />
    </b-modal>
    <b-modal hide-footer id="signUpDialog" title="Sign Up">
      <SignUp v-on:googleSignIn="googleSignIn" v-on:setWallet="setWallet" />
    </b-modal>
  </div>
</template>
<script>
import { DB } from "@/services/fireinit.js";
import SignIn from "@/components/dialogs/auth/signin";
import SignUp from "@/components/dialogs/auth/signup";
export default {
  components: { SignIn, SignUp },
  methods: {
    async googleSignIn() {
      this.$store
        .dispatch("signInWithGoogle")
        .then(async (result) => {
          const uid = result.user.uid;
          await this.setWallet(uid);
          this.$bvModal.hide("signInDialog");
          this.$bvModal.hide("signUpDialog");
        })
        .catch((e) => {
          console.log("Errorr");
          console.log(e.message);
        });
    },
    setWallet: async function (userUID) {
      try {
        const snapshots = await DB.collection("wallets")
          .where("uid", "==", userUID)
          .get();
        if (!snapshots.empty) {
          const walletSnapshot = snapshots.docs[0];
          const wallet = walletSnapshot.data();
          this.$store.commit("wallet/setBalance", wallet.balance);
          this.$store.commit("wallet/setPublicKey", wallet.publicKey);
          this.$store.dispatch("wallet/setBalanceEquivalent", wallet.balance);
          this.$router.push("/");
        } else {
          const result = await DB.collection("wallets").add({
            uid: userUID,
            balance: 0,
          });
          const querySnapshots = await DB.collection("wallets")
            .doc(result.id)
            .get();
          if (querySnapshots.exists) {
            const walletSnapshot = querySnapshots.docs[0];
            const wallet = walletSnapshot.data();
            this.$store.commit("wallet/setPublicKey", wallet.publicKey);
          }
          this.$store.commit("wallet/setBalance", 0);
          this.$store.dispatch("wallet/setBalanceEquivalent", 0);
          this.$router.push("/");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    },
  },
};
</script>