<template>
  <div class="forum-card">
    <div class="visit">
      <div class="visit-func">
        <router-link :to="'/forum'">
          <h2>Visit the Forum!</h2>
        </router-link>
        <p class="checkout">Checkout our forum!</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
          recusandae, voluptates soluta aliquid nulla nisi blanditiis ducimus
          vitae fuga quod quam, minima quis, nam suscipit officia ex? Quas, non
          officiis.
        </p>
      </div>
    </div>
    <div class="img-wrapper">
      <img :src="'https://picsum.photos/seed/23426/1920/1080/?blur=2'" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ForumCard",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>

.forum-card {
  display: flex;
  justify-content: center;
  gap: 50px;
  width: 100%;
  min-height: 500px;
  margin-top: 50px;
  border-radius: 10px;
  // background: rgb(83, 108, 235);
  // background: linear-gradient(
  //   245deg,
  //   rgb(70, 33, 126) 0%,
  //   rgb(94, 53, 156) 26%,
  //   rgb(135, 52, 160) 50%,
  //   rgb(189, 58, 171) 91%
  // );
  box-shadow: -6px 6px 0px 2px #3c2b7a;
  outline: 2px solid #3c2b7a;
  // border-top: 2px solid #3c2b7a;
  // border-bottom: 9px solid #3c2b7a;
  // border-left: 9px solid #3c2b7a;
  // border-right: 2px solid #3c2b7a;
  overflow: hidden;

  .visit {
    position: relative;
    flex: 40%;
    height: 400px;
    align-self: center;

    .visit-func {
      position: absolute;
      font-family: "Montserrat";
      right: 20px;
      margin-left: 40px;
      max-width: 400px;

      .checkout {
        margin-top: 50px;
      }

      h2 {
        text-align: center;
        background-color: #6347c7;
        padding: 10px;
        color: #fff;
        cursor: pointer;
        font-weight: bold;
      }

      p {
        text-align: justify;
        // color: #fff;
      }
    }
  }

  .img-wrapper {
    position: relative;
    align-self: center;
    height: 400px;
    flex: 60%;

    img {
      position: absolute;
      max-height: 95%;
      max-width: 95%;
      left: 0;
      top: 0px;
      bottom: 0px;
      box-shadow: 3px 3px 8px 2px #3e2c80;
      border-radius: 10px;
    }
  }
}
</style>
