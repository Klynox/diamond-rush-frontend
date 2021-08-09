<template>
    <div>
        <h2>Sign In</h2>
    <button type="button" @click="googleSignUp">Sign In with Google</button>
        <form @submit.prevent="submitLogin">
      <b-alert
        :show="dismissCountDown"
        dismissible
        variant="warning"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
      >
        {{ errorMsg }}
      </b-alert>
      <input type="text" placeholder="Username" v-model="formData.username" />
      <input
        type="password"
        placeholder="Enter Password"
        v-model="formData.password"
      />
      <button type="submit">Sign In</button>
    </form>
    </div>
</template>
<script>
import { DB, auth } from "@/services/fireinit.js";
export default {
  data() {
    return {
      errorMsg: null,
      formData: {
        username: null,
        password: null,
      },
      isLoading: false,
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
    submitLogin: async function () {
      this.errorMsg = null;
      this.isLoading = true;
      this.dismissCountDown = 0;
      if (!this.formData.username || !this.formData.password) {
        this.isLoading = false;
        this.errorMsg = "Please provide both username and password.";
        this.showAlert();
        return;
      }
      try {
        const requestData = {
          username: this.formData.username,
          password: this.formData.password,
        };
        const response = await this.$axios.post("/auth/signin", requestData);
        const result = await auth.signInWithCustomToken(response.data.token);
        const uid = result.user.uid;
        this.setWallet(uid);
        this.isLoading = false;
      } catch (err) {
        console.log(err);
        this.isLoading = false;
        if (
          err.response &&
          (err.response.status == 400 || err.response.status == 401)
        ) {
          this.errorMsg = err.response.data.error;
          this.showAlert();
          return;
        }
        this.errorMsg = "Request failed. please try again.";
        this.showAlert();
      }
    },
    googleSignUp() {
      this.$store
        .dispatch("signInWithGoogle")
        .then((result) => {
          const uid = result.user.uid;
          this.setWallet(uid);
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
                    console.log(querySnapshots.docs);
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