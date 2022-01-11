<template>
  <div class="container">
    <h1>Chào mừng đến với Edulanthropy</h1>
    <LoginByEmail
      @loginToken="LoginToken"
      v-show="showEmailLogin"
    ></LoginByEmail>
    <RegisterByEmail v-show="false"></RegisterByEmail>
    <router-view></router-view>
    <div v-show="loginScreen" class="login-button">
      <Button
        @btnClick="onClick"
        :text="'Use ' + 'email ' + '/ ' + 'phone ' + 'number '"
        :source="iconps"
      />
      <Button :text="'Continue ' + 'with ' + 'google'" :source="icongg" />
      <Button :text="'Continue ' + 'with ' + 'facebook'" :source="iconfb" />
      <Button :text="'Continue ' + 'with ' + 'github'" :source="icongh" />
    </div>
    <div class="sign-up">
      <h3>Bạn chưa có tài khoản?</h3>
      <router-link class="sign-up-router" to="/register">Đăng ký</router-link>
    </div>
  </div>
</template>

<script>
import iconperson from "../../assets/images/login_register/personal.svg";
import icongoogle from "../../assets/images/login_register/google.svg";
import iconfacebook from "../../assets/images/login_register/facebook.svg";
import icongithub from "../../assets/images/login_register/github.svg";
import Button from "./Button.vue";
import LoginByEmail from "./LoginByEmailScreen.vue";
import RegisterByEmail from "./RegisterByEmailScreen.vue";
export default {
  name: "LoginScreen",
  components: {
    Button,
    LoginByEmail,
    RegisterByEmail
  },
  methods: {
    onClick() {
      this.showEmailLogin = true;
    },
    LoginToken(res) {
      let token = res.data.items.token;
      this.$store.dispatch("sendToken", token);
      this.$router.push("/");
    }
  },
  data() {
    return {
      showEmailLogin: false,
      showEmailRegister: false,
      iconps: iconperson,
      icongg: icongoogle,
      iconfb: iconfacebook,
      icongh: icongithub
    };
  },
  computed: {
    loginScreen() {
      if (this.showEmailLogin === false) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style scoped>

.container {
  width: 640px;
  margin: 30px auto;
  overflow: auto;
  min-height: 600px;
  border: 1px solid #6347c7;
  padding: 30px;
  border-radius: 10px;
  font-family: 'Montserrat';
}
.login-button {
  display: flex;
  flex-direction: column;
}
h1 {
  color: #000;
  font-weight: bold;
  margin-bottom: 50px;
}
.sign-up {
  margin-top: 20px;
}

.sign-up .sign-up-router:hover {
  color: #6347c7;
}
</style>
