<template>
  <form
    action=""
    class="container__custom form-change-password"
    @submit="submitHandler"
  >
    <div class="form-control__custom">
      <label>Password</label>
      <input type="text" placeholder="Enter password" v-model="password" />
    </div>
    <div v-show="showPasswordRequest" style="text-align: left; color:red">
      <p>Vui lòng nhập lại mật khẩu cũ</p>
    </div>
    <div class="form-control__custom">
      <label>New Password</label>
      <input
        type="text"
        placeholder="Enter new password"
        v-model="newPassword"
      />
    </div>
    <div v-show="showPasswordRequest" style="text-align: left; color:red">
      <p>Vui lòng nhập mật khẩu mới</p>
    </div>
    <div class="form-control__custom">
      <label>Confirm Password</label>
      <input type="text" placeholder="Confirm password" v-model="verify" />
    </div>
    <div v-show="showPasswordRequest" style="text-align: left; color:red">
      <p>Vui lòng nhập lại mật khẩu mới</p>
    </div>
    <button class="saveBtn">Save</button>
  </form>
</template>

<script>
import "../UI/reuse.css";
import { Authen } from "../../services/apis/ApiService";
export default {
  name: "PasswordChange",
  data() {
    return {
      password: "",
      newPassword: "",
      verify: "",
      showPasswordRequest: false,
      showNewPasswordRequest: false,
      showVerifyRequest: false
    };
  },
  methods: {
    submitHandler(event) {
      event.preventDefault();
      if (!this.password) {
        this.showPasswordRequest = true;
      }
      if (!this.newPassword) {
        this.showNewPasswordRequest = true;
      }
      if (!this.verify) {
        this.showVerifyRequest = true;
      }
      if (!this.password || !this.newPassword || !this.verify) {
        return;
      }
      const param = {
        old_password: this.password,
        new_password: this.newPassword
      };
      Authen.changePassword(param).then(res => console.log(res));
    }
  }
};
</script>

<style lang="scss">

.form-change-password {
  margin-top: 0;
  min-height: 500px;
  font-family: "Montserrat";
  border-color: #6347c7;
  border-radius: 10px;

  div {
    margin-bottom: 15px;
    label {
      padding-left: 5px;
      font-weight: bold;
    }

    input {
      padding-left: 10px;
      font-size: 15px;
    }
  }
}

.saveBtn {
  background-color: #6347c7;
  color: white;
  width: 10rem;
  height: 3rem;
  border-radius: 1.5rem;
  outline: none;
  border: 1px solid #ccc;
  margin-top: 1rem;
}
</style>
