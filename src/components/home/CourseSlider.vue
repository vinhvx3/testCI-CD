<template>
  <div class="course-slider">
    <div class="title">
      <h2>{{ title }}</h2>
      <router-link :to="'/courses'">
        <div class="view-more">
          <div>View more</div>
          <i class="fas fa-chevron-right"></i>
        </div>
      </router-link>
    </div>

    <div class="slides-container" ref="container">
      <div class="course" v-for="(course, index) in courses" :key="index">
        <div class="img-wrapper">
          <img :src="course.img" />
        </div>

        <div class="course-info">
          <h3>{{ course.name }}</h3>
          <p>{{ course.desc }}</p>
        </div>
      </div>
    </div>

    <i @click="scrLeft" class="left fas fa-chevron-left scr-btn"></i>
    <i @click="scrRight" class="right fas fa-chevron-right scr-btn"></i>
  </div>
</template>

<script>
export default {
  name: "CourseSlider",
  data() {
    return {};
  },
  props: {
    title: String,
    courses: []
  },
  methods: {
    scrLeft() {
      this.$refs.container.scrollBy({
        top: 0,
        left: -800,
        behavior: "smooth"
      });
    },
    scrRight() {
      this.$refs.container.scrollBy({
        top: 0,
        left: +800,
        behavior: "smooth"
      });
    }
  }
};
</script>

<style lang="scss" scoped>

::-webkit-scrollbar {
  height: 5px;
  scroll-behavior: smooth;
}

::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 2.5px;
}

.course-slider {
  background: rgb(50, 6, 117);
  background: linear-gradient(
    41deg,
    rgba(50, 6, 117, 1) 0%,
    rgba(62, 35, 126, 1) 17%,
    rgba(107, 56, 196, 1) 55%,
    rgba(179, 5, 198, 1) 96%
  );
  margin-top: 50px;
  padding: 20px 60px;
  position: relative;
  border-radius: 10px;
  box-shadow: -6px 6px 0px 2px #2b1c61;
  // outline: 2px solid #3c2b7a;

  .scr-btn {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    cursor: pointer;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    background-color: #fff;
    color: #6347c7;
    box-shadow: 0px 2px 5px #412f85;
  }

  .scr-btn:hover {
    color: #937de4;
  }

  .left {
    left: 20px;
  }
  .right {
    right: 20px;
  }
}

.title {
  text-align: left;
  margin-bottom: 30px;
  position: relative;

  h2 {
    font-family: "Montserrat";
    font-weight: 700;
    color: #fff;
  }

  .view-more {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 20px;
    right: 20px;
    gap: 4px;
    color: #fff;

    div {
      font-family: "Montserrat";
      font-weight: 500;
    }
  }

  .view-more:hover div,
  :hover i {
    cursor: pointer;
    color: #f2a8fa;
  }
}

.slides-container {
  padding-top: 5px;
  display: flex;
  overflow-x: auto;
  gap: 10px;
}

.slides-container:hover {
  &::-webkit-scrollbar-thumb {
    background-color: #7759e6;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #937de4;
  }
}

.course {
  box-shadow: -2px 3px 8px 1px #342764;
  border-radius: 10px;
  margin-bottom: 20px;
  margin-left: 15px;
  margin-right: 15px;

  .img-wrapper {
    width: 300px;
    height: 100px;

    img {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      max-width: 100%;
      //max-height: 100%;
    }
  }

  .course-info {
    padding: 20px;
    text-align: left;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: #fff;
    //color: #FFF;
    font-family: "Montserrat";

    h3 {
      font-weight: bold;
      font-size: 22px;
    }

    p {
      font-weight: 500;
      font-size: 15px;
    }
  }
}
</style>
