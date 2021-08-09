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
    googleSignIn() {
      this.$store
        .dispatch("signInWithGoogle")
        .then((result) => {
          const uid = result.user.uid;
          this.setWallet(uid);
          this.$bvModal.hide("signInDialog");
          this.$bvModal.hide("signUpDialog");
        })
        .catch((e) => {
          console.log("Errorr");
          console.log(e.message);
        });
    },
    setWallet: function (userUID) {
      DB.collection("wallets")
        .where("uid", "==", userUID)
        .get()
        .then((snapshots) => {
          if (!snapshots.empty) {
            const walletSnapshot = snapshots.docs[0];
            const wallet = walletSnapshot.data();
            this.$store.commit("wallet/setBalance", wallet.balance);
            this.$store.commit("wallet/setPublicKey", wallet.publicKey);
            this.$store.dispatch("wallet/setBalanceEquivalent", wallet.balance);
            this.$router.push("/");
          } else {
            DB.collection("wallets")
              .add({
                uid: userUID,
                balance: 0,
              })
              .then((result) => {
                DB.collection("wallets")
                  .doc(result.id)
                  .get()
                  .then((querySnapshots) => {
                    const walletSnapshot = querySnapshots.docs[0];
                    const wallet = walletSnapshot.data();
                    this.$store.commit("wallet/setPublicKey", wallet.publicKey);
                  });
                this.$store.commit("wallet/setBalance", 0);
                this.$store.dispatch("wallet/setBalanceEquivalent", 0);
                this.$router.push("/");
              })
              .catch((error) => {
                console.error("Error writing document: ", error);
              });
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    },
  },
};
</script>