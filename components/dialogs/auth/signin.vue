<template>
  <div>
    <form @submit.prevent="submitLogin">
      <b-alert
        :show="dismissCountDown"
        dismissible
        variant="danger"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
      >
        {{ errorMsg }}
      </b-alert>
      <div class="mx-auto col-sm-11">
        <div class="form-group">
          <input
            type="text"
            class="form-control signin-form"
            placeholder="Username"
            v-model="formData.username"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control signin-form"
            placeholder="Enter Password"
            v-model="formData.password"
          />
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-action" :disabled="isLoading">
            <span v-if="isLoading">Signing in. please wait...</span>
            <span v-else>Sign In</span>
          </button>
        </div>
      </div>
    </form>
    <div class="d-flex flex-row justify-content-center social-loginXsv">
      <a
        class="d-flex login-btn"
        @click="$emit('googleSignIn')"
        v-if="!isLoading"
        ><img src="/images/google-icon.svg" />
        <span>Sign In with Google</span></a
      >
    </div>
  </div>
</template>
<script>
import { auth } from "@/services/fireinit.js";
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
        this.$emit("setWallet", uid);
        this.$bvModal.hide("signInDialog");
        this.isLoading = false;
      } catch (err) {
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
  },
};
</script>
<style lang="scss" scoped>
</style>