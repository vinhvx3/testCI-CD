<template>
  <form @submit="onSubmit" class="email-register">
    <div class="form-control">
      <label class="name-label" for="">Tên của bạn?</label>
    </div>
    <div class="form-control">
      <input
        class="name"
        v-model="name"
        type="text"
        name="name"
        placeholder="Họ và tên"
      />
    </div>
    <div v-show="showNameRequest" style="color:red" class="form-control">
      <p>Vui lòng nhập họ tên</p>
    </div>
    <div class="form-control">
      <label class="email-label" for="">Email</label>
    </div>
    <div class="form-control">
      <input
        class="email"
        v-model="text"
        type="text"
        name="email"
        placeholder="Địa chỉ email"
      />
    </div>
    <div v-show="showEmailRequest" style="color:red" class="form-control">
      <p>Email không hợp lệ</p>
    </div>
    <div class="form-control">
      <input
        type="password"
        v-model="password"
        name="password"
        placeholder="Mật khẩu"
      />
    </div>
    <div v-show="showPasswordRequest" style="color:red" class="form-control">
      <p>Mật khẩu không hợp lệ</p>
    </div>
    <div class="form-control">
      <p>Gợi ý: Mật khẩu cần có ít nhất 8 ký tự</p>
    </div>
    <div class="form-control">
      <input
        type="password"
        v-model="verify"
        name="verify"
        placeholder="Nhập lại mật khẩu"
      />
    </div>
    <div
      v-show="showPasswordRetypeRequest"
      style="color:red"
      class="form-control"
    >
      <p>Mật khẩu nhập lại không hợp lệ</p>
    </div>
    <div class="form-control form-control-check">
      <div class="level">
        <input type="checkbox" v-model="position1" name="position" />
        <label for="">Sinh viên</label>
      </div>
      <div class="level">
        <input type="checkbox" v-model="position2" name="position" />
        <label for="">Giáo viên</label>
      </div>
    </div>
    <div v-show="showPositionRequest" style="color:red" class="form-control">
      <p>Vui lòng chọn vai trò</p>
    </div>
    <div class="form-control">
      <input
        style="background: #1dbfaf;"
        type="submit"
        value="Đăng ký"
        class="btn sign-in-btn"
      />
    </div>
  </form>
</template>
<script>
import Button from "./Button.vue";

export default {
  name: "RegisterByEmail",
  components: {
    Button
  },
  data() {
    return {
      text: "",
      verify: "",
      password: "",
      name: "",
      position1: false,
      position2: false,
      showNameRequest: false,
      showEmailRequest: false,
      showPasswordRequest: false,
      showPasswordRetypeRequest: false,
      showPositionRequest: false
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.showNameRequest = this.name ? false : true;
      this.showPasswordRequest = this.password.length >= 8 ? false : true;
      this.showPasswordRetypeRequest = this.verify ? false : true;
      this.showPositionRequest =
        this.position1 || this.position2 ? false : true;
      let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      this.showEmailRequest = this.text.match(regexEmail) ? false : true;
      if (
        !this.name ||
        !this.password ||
        !this.verify ||
        (!this.position1 && !this.position2) ||
        !this.text.match(regexEmail)
      ) {
        return;
      }

      const newUser = {
        name: this.name,
        email: this.text,
        level: this.position1 ? "0" : "1",
        password: this.password
      };
      this.$emit("addUser", newUser);
      this.name = "";
      this.text = "";
      (this.position1 = false), (this.position2 = false), (this.password = "");
      this.verify = "";
    }
  }
};
</script>
<style>
.container {
  width: 640px;
  margin: 30px auto;
  overflow: auto;
  min-height: 600px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
.email-register {
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
p {
  margin-bottom: 0;
  font-size: 14px;
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
}
.form-control input {
  width: 100%;
  height: 44px;
  padding: 3px 7px;
  font-size: 17px;
  border: 2px solid #dce0e3;
  border-radius: 25px;
  background: #f1f1f2;
  outline: none;
}
.form-control input:focus {
  outline: none;
}
.sign-in-btn {
  letter-spacing: 2px;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
  border-radius: 25px;
  width: 100%;
  outline: none;
  border: none;
}
.sign-in-btn:hover {
  color: #fff;
}
.sign-in-btn:focus {
  outline: none;
  box-shadow: none;
}
.sign-in-btn:active {
  transform: scale(0.98);
}
.name-label,
.email-label {
  font-weight: bold;
}
.level {
  display: flex;
  margin-left: 30px;
}
.level label {
  margin-left: 8px;
}
.form-control-check input {
  width: 20px;
  height: 20px;
}
</style>
