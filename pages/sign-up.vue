<template>
  <div>
    <h2>Sign Up</h2>
    <button type="button" @click="googleSignUp">Sign In with Google</button>
  </div>
</template>
<script>
import { DB } from "@/services/fireinit.js";
export default {
  data() {
    return {
      errorMsg: null,
      formData: {
        username: null,
        password: null,
        retypePassword: null,
        emailAddress: null,
      },
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    passwordSignUp() {
      if (this.formData.username && this.formData.password) {
        if (this.formData.password !== this.formData.retypePassword) {
          this.errorMsg = "Password and retyped password do not match.";
          this.showAlert();
        }
      } else {
        this.errorMsg = "Please provide both username and password.";
        this.showAlert();
      }
    },
    googleSignUp() {
      this.$store
        .dispatch("signInWithGoogle")
        .then((result) => {
          const uid = result.user.uid;
          DB.collection("wallets")
            .where("uid", "==", uid)
            .get()
            .then((snapshots) => {
              if (!snapshots.empty) {
                const walletSnapshot = snapshots.docs[0];
                const wallet = walletSnapshot.data();
                this.$store.commit("wallet/setBalance", wallet.balance);
                this.$store.commit("wallet/setPublicKey", wallet.publicKey);
                this.$store.dispatch(
                  "wallet/setBalanceEquivalent",
                  wallet.balance
                );
                this.$router.push("/");
              } else {
                DB.collection("wallets")
                  .add({
                    uid: uid,
                    balance: 0,
                  })
                  .then((result) => {
                    DB.collection("wallets")
                      .doc(result.id)
                      .get()
                      .then((snapshots) => {
                        const walletSnapshot = snapshots.docs[0];
                        const wallet = walletSnapshot.data();
                        this.$store.commit(
                          "wallet/setPublicKey",
                          wallet.publicKey
                        );
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
        })
        .catch((e) => {
          console.log("Errorr");
          console.log(e.message);
        });
    },
  },
};
</script>