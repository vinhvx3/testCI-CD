<template>
  <div class="os-header">
    <b-navbar toggleable type="light">
      <b-navbar-brand class="d-md-none sidebar-button">
        <b-navbar-toggle target="" v-b-toggle.sidebar-sub></b-navbar-toggle>
      </b-navbar-brand>
      <b-navbar-brand class="logo-header">
        <router-link to="/">
          <img src="../../assets/images/logo.png" alt="" srcset="" />
        </router-link>
      </b-navbar-brand>

      <b-navbar-brand class="d-none d-sm-block">
        <span class="sologan-header">THIS IS SOLOGAN</span>
      </b-navbar-brand>

      <b-nav-form class="d-none d-md-block">
        <b-form-input
          size="lg"
          class="mr-sm-2 search-input"
          placeholder="Search"
        >
        </b-form-input>
      </b-nav-form>

      <b-nav-item-dropdown class="avatar-header">
        <template #button-content>
          <b-avatar variant="primary" class="avatar-img"></b-avatar>
        </template>
        <div v-if="$store.state.token">
          <b-dropdown-item>
            <router-link to="/profile">profile</router-link>
          </b-dropdown-item>
          <b-dropdown-item @click="signOut">Sign Out</b-dropdown-item>
        </div>
        <div v-else>
          <b-dropdown-item>
            <router-link to="/login">Sign In</router-link>
          </b-dropdown-item>
          <b-dropdown-item>
            <router-link to="/register">Register</router-link>
          </b-dropdown-item>
        </div>
      </b-nav-item-dropdown>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    signOut() {
      this.$store.dispatch("sendToken", "");
      this.$route.path != "/" && this.$router.push("/");
    },
  }
};
</script>

<style lang="scss" scope>
.os-header {
  width: 100%;
  height: 86px;
  z-index: 1000;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;

  position: fixed;
  top: 0;
  left: 0;

  .logo-header {
    margin-left: 18px;
    img {
      width: 60px;
      height: 60px;
      flex-shrink: 0;
      object-fit: contain;
      border-radius: 10px;
    }
  }

  .sologan-header {
    font-weight: 900;
  }
  .search-input {
    display: inline;
    width: auto;
    border-radius: 20px;
  }

  .avatar-header {
    margin-right: 40px;

    .dropdown-toggle {
      border: none;
      outline: none;
    }
    .dropdown-menu {
      position: absolute;
      right: 0;
      top: 130%;
    }
  }
  .sidebar-button {
    margin-left: 20px;
    .navbar-toggler:focus {
      box-shadow: none;
    }
  }
}
</style>
