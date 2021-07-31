<template>
  <div>
    <h2>Sign Up</h2>
    <button type="button" @click="googleSignUp">Sign In with Google</button>
    <!-- <form @submit.prevent="passwordSignUp">
      <b-alert
        :show="dismissCountDown"
        dismissible
        variant="warning"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
      >
        <p>This alert will dismiss after {{ dismissCountDown }} seconds...</p>
      </b-alert>
      <input type="text" placeholder="Username" v-model="formData.username" />
      <input
        type="password"
        placeholder="Enter Password"
        v-model="formData.password"
      />
      <input
        type="password"
        placeholder="Retype Password"
        v-model="formData.retypePassword"
      />
      <button type="submit">Sign Up</button>
    </form> -->
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
            .then((wallet) => {
              if (!wallet.empty) {
                const walletDetails = wallet.docs[0];
                this.$store.commit("wallet/setBalance", walletDetails.balance);
                this.$store.dispatch("wallet/setBalanceEquivalent", {});
                this.$router.push("/");
              } else {
                DB.collection("wallets")
                  .add({
                    uid: uid,
                    balance: 0,
                  })
                  .then(() => {
                    this.$store.commit("wallet/setBalance", 0);
                    this.$store.dispatch("wallet/setBalanceEquivalent", {});
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