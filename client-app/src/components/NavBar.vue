<template>
    <b-navbar class="navbar">
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    class="logo"
                    src="../assets/shoe-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item href="/">
                Home
            </b-navbar-item>
            <b-navbar-dropdown label="Pages">
                <b-navbar-item href="/admin" v-if="showAdminBoard">
                    Admin Board
                </b-navbar-item>
                <b-navbar-item href="/mod" v-if="showModeratorBoard">
                    Moderator Board
                </b-navbar-item>
                <b-navbar-item href="/user" v-if="currentUser">
                    User
                </b-navbar-item>
                <b-navbar-item href="/products">
                    Products
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template #end >
            <b-navbar-item tag="div" v-if="!currentUser" class="nav-items">
                <div class="buttons">
                    <a 
                        class="button is-light"
                        href="/login"
                    >
                        Log in
                    </a>

                    <a 
                        class="button is-light"
                        href="/register"
                    >
                        Sign Up
                    </a>
                    
                </div>
            </b-navbar-item>

            <b-navbar-item tag="div" v-if="currentUser" class="nav-items">
                <div class="buttons">
                    <a 
                        class="button is-light"
                        href="/profile"
                    >
                        {{ currentUser.username }}
                    </a>
                    <a 
                        class="button is-light"
                        href
                        @click.prevent="logOut"
                    >
                        Logout
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {
    name: "NavBar",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_ADMIN");
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_MODERATOR");
      }

      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    redirectToProfile(){
        this.$router.push("/profile");
    }
  },
};
</script>

<style>
    .navbar {
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); 
        padding: 0;
        display: flex;
        align-items: center;
    }
    .logo-text {
        transform: rotate(45deg);
    }

    .logo {
        height: 60px !important;
        max-height: 60px !important;
    }
</style>