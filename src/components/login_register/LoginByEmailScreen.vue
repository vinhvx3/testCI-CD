<template>
  <form @submit="onSubmit" class="email-login">
    <div class="form-control">
      <label class="email">Email</label>
    </div>
    <div class="form-control">
      <input
        v-model="text"
        type="text"
        name="phoneNum"
        placeholder="Nhập email"
      />
    </div>
    <div v-show="showEmailRequest" class="form-control" style="color:red">
      <p>Vui lòng nhập email</p>
    </div>
    <div class="form-control">
      <label class="password">Mật khẩu</label>
    </div>
    <div class="form-control">
      <input
        v-model="verify"
        type="password"
        name="verify"
        placeholder="Nhập mật khẩu"
      />
    </div>
    <div v-show="showPasswordRequest" class="form-control" style="color:red">
      <p>Vui lòng nhập mật khẩu</p>
    </div>
    <div class="form-control">
      <input type="submit" value="Đăng nhập" class="sign-in-btn" />
    </div>
  </form>
</template>

<script>
import { Authen } from "../../services/apis/ApiService";
import Button from "./Button.vue";
export default {
  name: "LoginByEmail",
  components: {
    Button
  },
  data() {
    return {
      text: "",
      verify: "",
      showEmailRequest: false,
      showPasswordRequest: false
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      if (!this.text) {
        this.showEmailRequest = true;
      }
      if (!this.verify) {
        this.showPasswordRequest = true;
      }
      if (!this.text || !this.verify) {
        return;
      }
      const user = {
        email: this.text,
        password: this.verify
      };
      Authen.login(user).then(res => this.$emit("loginToken", res));
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
  padding: 30px;
  /* border: 1px solid steelblue;
  border-radius: 5px; */
}
.email-login {
  width: 80%;
  align-items: center;
  text-align: center;
  margin: 0 auto;
}
h1 {
  color: #000;
  font-weight: bold;
  margin-bottom: 50px;
}
.sign-up {
  margin-top: 20px;
}
.form-control {
  width: 100%;
  align-items: center;
  margin: 0 auto;
  border: none;
  display: flex;
}
.form-control label {
  display: block;
  font-weight: bold;
}
.form-control input {
  width: 100%;
  height: 44px;
  padding: 3px 15px;
  font-size: 17px;
  border: 2px solid #dce0e3;
  border-radius: 25px;
  margin-top: 0px;
  margin-bottom: 15px;
}
.form-control input:focus {
  outline: none;
}
.phoneNum {
  text-align: start;
  flex: 1;
}
.loginWithEmail {
  text-align: end;
  flex: 1;
}
.send-btn {
  padding: 9px 10px;
  background: #dce0e3;
}
.sign-in-btn {
  margin-top: 20px;
  letter-spacing: 2px;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
  border-radius: 25px;
  width: 100%;
  background: #6347c7;
}

/* .sign-in-btn:active {
  transition: none;
} */

.form-control p {
  margin-bottom: 0;
}

/* Email */
.email {
  text-align: start;
  flex: 1;
}
.loginWithPhoneNum {
  text-align: end;
  flex: 1;
}
</style>
