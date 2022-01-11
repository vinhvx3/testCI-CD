<template>
  <div id="app">
    <div :class="`os-container ${checkRouter ? '' : 'blank'}`">
      <Header />
      <SideBar />
      <div class="os-main">
        <router-view />
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "../src/components/constructs/Header.vue";
import SideBar from "../src/components/constructs/SideBar.vue";
import Footer from "../src/components/constructs/Footer.vue";

export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    Header,
    SideBar,
    Footer,
  },
  computed: {
    checkRouter() {
      return (
        this.$route.path.toLowerCase() !== "/login" &&
        this.$route.path.toLowerCase() !== "/register"
      );
    },
  },
  mounted() {
    if (localStorage.access_token) {
      this.$store.dispatch("sendToken", localStorage.access_token);
    }
  },
};
</script>


<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap");

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .os-container {
    margin-left: 96px;
    .os-main {
      width: 100%; // width 100% nhìn đẹp hơn 100% - 96px :v
      margin-top: 86px;
      padding: 20px 2% 50px 2%;
      position: relative;
    }
  }

  .os-container.blank {
    .os-header,
    .os-sidebar,
    .footer {
      display: none;
    }
    .os-main {
      margin-top: 0;
      margin-left: 0;
    }
  }
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #000;
  text-decoration: none;

  &:hover {
    color: red;
  }
}

@media screen and (max-width: 768px) {
  .os-container {
    margin-left: 0 !important;
  }
}
.btn {
  display: inline-block;
  background: #fff;
  color: #000;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:hover {
  background-color: #dce0e3;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
</style>
