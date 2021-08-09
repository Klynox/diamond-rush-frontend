<template>
  <div>
    <form @submit.prevent="passwordSignUp">
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
          <input
            type="password"
            class="form-control signin-form"
            placeholder="Retype Password"
            v-model="formData.retypePassword"
          />
        </div>
        <div class="form-group">
          <input
            type="email"
            class="form-control signin-form"
            placeholder="Enter email address"
            v-model="formData.emailAddress"
          />
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-action" :disabled="isLoading">
            <span v-if="isLoading">Please wait...</span>
            <span v-else>Sign Up</span>
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
        <span>Sign Up with Google</span></a
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
        retypePassword: null,
        emailAddress: null,
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
    passwordSignUp: async function () {
      this.errorMsg = null;
      this.isLoading = true;
      this.dismissCountDown = 0;
      if (this.formData.username && this.formData.password) {
        if (this.formData.password != this.formData.retypePassword) {
          this.isLoading = false;
          this.errorMsg = "Password and retyped password do not match.";
          this.showAlert();
          return;
        }
      } else {
        this.isLoading = false;
        this.errorMsg = "Please provide both username and password.";
        this.showAlert();
        return;
      }
      try {
        const requestData = {
          username: this.formData.username,
          password: this.formData.password,
          retypePassword: this.formData.retypePassword,
          emailAddress: this.formData.emailAddress,
        };
        const response = await this.$axios.post("/auth/new", requestData);
        const result = await auth.signInWithCustomToken(response.data.token);
        const uid = result.user.uid;
        this.$emit("setWallet", uid);
        this.$bvModal.hide("signUpDialog");
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