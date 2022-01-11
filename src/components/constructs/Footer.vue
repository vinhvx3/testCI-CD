<template>
  <div class="footer">
    <div class="copy-right">Copyright by htvd@hcmus.edu.vn</div>
    <div class="footer-menu">
      <a href="#">Giới thiệu</a>
      <a href="#">Chính sách</a>
      <a href="#">Bảo mật</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    homePage() {
      if (this.$route.path === "/") {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scope>
.footer {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 20px 10px;
  background: #f3f6fa;

  .copy-right {
    flex: 0 50%;
    color: #999;
  }
  .footer-menu {
    flex: 0 30%;
    display: flex;
    align-items: center;
    a {
      flex: 0 30%;
    }
  }
}
</style>
