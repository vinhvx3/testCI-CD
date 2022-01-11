<template>
  <div class="carousel-slide">
    <transition :name="direction">
      <div
        v-show="activeSlide === index"
        class="activeSlide"
        :style="{ backgroundImage: 'url(' + slideInfo.img + ')' }"
        style="border-radius: 10px;"
      >
        <!-- <img :src="slideInfo.img" /> -->
        <div class="content">
          <h2>{{ slideInfo.title }}</h2>
          <p>{{ slideInfo.text }}</p>
          <a :href="slideInfo.url"
            ><button>{{ slideInfo.urlText }}</button></a
          >
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "CarouselSlide",
  data() {
    return {};
  },
  props: {
    activeSlide: Number,
    index: Number,
    slideInfo: {},
    direction: String
  }
};
</script>

<style lang="scss" scoped>
// .activeSlide {
//     position: relative;
//     width: 1024px;
//     margin-left: 100px;
// }

button {
  width: auto;
  height: 40px;
  border: 4px solid #fff;
  border-radius: 20px;
  font-family: "Montserrat";
  font-weight: 500;
  color: #fff;
  background-color: transparent;
}

button:hover {
  background-color: #fff;
  color: #6347c7;
}

.activeSlide {
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
}

img {
  border-radius: 10px;
  //position: relative;
}

.content {
  z-index: 1;
  // position: absolute;
  // bottom: 16px;
  // left: 16px;
  text-align: left;
  margin-left: 80px;
  //margin-left: calc((100% - min(100%, 1600px))/2);

  h2 {
    font-family: "Montserrat";
    font-weight: 900;
    text-shadow: 0px 0px 5px #555;
    color: #fff;
  }
  p {
    font-family: "Montserrat";
    font-weight: 500;
    color: #fff;
  }
}

.left-enter-active {
  animation: leftInAnimation 0.6s ease-in-out;
}

.left-leave-active {
  animation: leftOutAnimation 0.6s ease-in-out;
}

@keyframes leftInAnimation {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes leftOutAnimation {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

.right-enter-active {
  animation: rightInAnimation 0.6s ease-in-out;
}

.right-leave-active {
  animation: rightOutAnimation 0.6s ease-in-out;
}

@keyframes rightInAnimation {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes rightOutAnimation {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
</style>
