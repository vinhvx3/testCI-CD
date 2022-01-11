<template>
  <div class="home">
    <HomeCarousel />
    <Overview />

    <CourseSlider title="These are our courses" :courses="this.courses" />

    <ForumCard />
  </div>
</template>

<script>
import HomeCarousel from "./HomeCarousel.vue";
import CourseSlider from "./CourseSlider.vue";
import ForumCard from "./ForumCard.vue";
import Overview from "./Overview.vue";

export default {
  name: "HomeScreen",
  data() {
    return {
      courses: [
        {
          name: "OOP",
          desc: "This is the course's brief description. Later changed",
          img: "https://picsum.photos/seed/345253/1920/640/?blur=2"
        },
        {
          name: "Linear algebra",
          desc: "This is the course's brief description. Later changed",
          img: "https://picsum.photos/seed/345253/1920/640/?blur=2"
        },
        {
          name: "Calculus 1",
          desc: "This is the course's brief description. Later changed",
          img: "https://picsum.photos/seed/345253/1920/640/?blur=2"
        },
        {
          name: "Calculus 2",
          desc: "This is the course's brief description. Later changed",
          img: "https://picsum.photos/seed/345253/1920/640/?blur=2"
        },
        {
          name: "Calculus 3",
          desc: "This is the course's brief description. Later changed",
          img: "https://picsum.photos/seed/345253/1920/640/?blur=2"
        },
        {
          name: "Calculus 4",
          desc: "This is the course's brief description. Later changed",
          img: "https://picsum.photos/seed/345253/1920/640/?blur=2"
        },
        {
          name: "Calculus 5",
          desc: "This is the course's brief description. Later changed",
          img: "https://picsum.photos/seed/345253/1920/640/?blur=2"
        }
      ]
    };
  },
  mounted() {
    // AuthenApi.login({email:"client1@gmail.com",password: "123456"}).then((res)=>{
    //   console.log("loginnnnn", res);
    // })
  },
  components: {
    HomeCarousel,
    CourseSlider,
    ForumCard,
    Overview
  }
};
</script>

<style lang="scss" scope></style>
