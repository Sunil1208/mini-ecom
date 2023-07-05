<template>
  <LandingPage />
</template>

<script>
  import LandingPage from "@/components/LandingPage.vue";
import UserService from "../services/user.service";

export default {
  name: "HomeView",
  components: {
    LandingPage,
  },
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>