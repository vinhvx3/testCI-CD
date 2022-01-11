<template>
  <div class="home-carousel">
    <!-- <transition-group>
            <img v-for="(slide, index) in slides" 
                :key="index" 
                :src="slide.img" 
                v-show="index===currentSlide"
            />
        </transition-group> -->
    <CarouselSlide
      class="slides"
      v-for="(slide, index) in slides"
      :key="index"
      :activeSlide="currentSlide"
      :index="index"
      :slideInfo="slide"
      :direction="direction"
    />

    <i @click="prev" class="prev fas fa-chevron-left change-slide-btn"></i>
    <i @click="next" class="next fas fa-chevron-right change-slide-btn"></i>
    <div class="indicators">
      <span
        @click="changeSlide(i)"
        v-for="i in slidesSize"
        :key="i"
        :class="{ active: i === currentSlide + 1 }"
        class="paginations"
      ></span>
    </div>
  </div>
</template>

<script>
import CarouselSlide from "./CarouselSlide.vue";
export default {
  name: "HomeCarousel",
  data() {
    return {
      slides: [
        {
          img: "https://picsum.photos/seed/235253/1920/240/?blur=2",
          title: "BIG TITLE",
          text:
            "Lorem ipssum dsjflak jldskfj kahdfkjhf jhsdfj hsjkdhf ksh ksjh kd",
          url: "#",
          urlText: "More info"
        },
        {
          img: "https://picsum.photos/seed/345253/1920/240/?blur=2",
          title: "BIG TITLE",
          text:
            "Lorem ipssum dsjflak jldskfj kahdfkjhf jhsdfj hsjkdhf ksh ksjh kd",
          url: "#",
          urlText: "More info"
        },
        {
          img: "https://picsum.photos/seed/756878/1920/240/?blur=2",
          title: "BIG TITLE",
          text:
            "Lorem ipssum dsjflak jldskfj kahdfkjhf jhsdfj hsjkdhf ksh ksjh kd",
          url: "#",
          urlText: "More info"
        },
        {
          img: "https://picsum.photos/seed/23426/1920/240/?blur=2",
          title: "BIG TITLE",
          text:
            "Lorem ipssum dsjflak jldskfj kahdfkjhf jhsdfj hsjkdhf ksh ksjh kd",
          url: "#",
          urlText: "More info"
        }
      ],
      currentSlide: 0,
      autoplayEnabled: true,
      autoplayInterval: 7000,
      direction: "left"
    };
  },
  components: {
    CarouselSlide
  },
  computed: {
    slidesSize() {
      return this.slides.length;
    }
  },
  mounted() {
    if (this.autoplayEnabled) this.autoplay();
  },
  methods: {
    prev() {
      if (this.currentSlide === 0) this.currentSlide = this.slidesSize - 1;
      else this.currentSlide--;

      this.direction = "right";
    },
    next() {
      this.currentSlide++;
      this.currentSlide %= this.slidesSize;

      this.direction = "left";
    },
    changeSlide(i) {
      if (this.currentSlide > i - 1) this.direction = "right";
      else this.direction = "left";
      this.currentSlide = i - 1;
    },
    autoplay() {
      setInterval(() => {
        this.next();
      }, this.autoplayInterval);
    }
  }
};
</script>

<style lang="scss" scoped>
.home-carousel {
  position: relative;
  overflow: hidden;
  // margin-left: 40px;
  // margin-right: 40px;

  //height: 200px;
  min-height: 200px;
  //max-height: 1000px;

  // img {
  //     border-radius: 10px;
  // }

  .change-slide-btn {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: calc(50% - 15px);
    cursor: pointer;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    background-color: #6347c7;
    color: #fff;
    box-shadow: 0px 2px 5px #888;
  }
  .change-slide-btn:hover {
    background-color: #6950c7;
  }

  .next {
    right: 0px;
    margin-right: 20px;
  }
  .prev {
    left: 0px;
    margin-left: 20px;
  }
}

.indicators {
  position: absolute;
  width: 100%;
  bottom: 12px;
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;

  .paginations {
    cursor: pointer;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0px 2px 5px #999;
  }
  .active {
    background-color: #6347c7;
  }
}

.slides {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
}
</style>
