<template>
  <div>
    <PageErrorCard :homeBtn="true">
      <h3 v-if="error.statusCode === 404">Page not found</h3>
      <h3 v-else>An error occurred</h3>
      <p>it seems you have visited the wrong URL</p>
    </PageErrorCard>
  </div>
</template>

<script>
import PageErrorCard from "@/components/cards/page-error-card";
export default {
  props: ["error"],
  layout: "default",
  components: {
    PageErrorCard,
  },
};
</script>