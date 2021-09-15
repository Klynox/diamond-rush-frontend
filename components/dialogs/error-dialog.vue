<template>
  <div>
    <b-modal hide-footer id="globalErrorAlertDialog" title="Error!">
      <div class="d-block text-center">
        <div class="form-caption">
          {{ globalErrorMsg }}
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  computed: {
    globalErrorMsg() {
      return this.$store.getters.globalSiteError;
    },
  },
};
</script>