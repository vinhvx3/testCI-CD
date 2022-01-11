<template>
  <div class="os-sidebar">
    <div class="sidebar-container d-none d-md-block">
      <div class="menu-sidebar">
        <b-list-group>
          <b-list-group-item v-for="(item, index) in menuList" :key="index">
            <router-link :to="item.href">
              <div class="icon">
                <img :src="item.icon" :alt="item.title" />
              </div>
              <div class="title">{{ item.title }}</div>
            </router-link>
          </b-list-group-item>
        </b-list-group>
      </div>

      <div class="list-course" v-if="$store.state.token">
        <div class="list-title">Khóa học</div>
        <b-list-group>
          <b-list-group-item v-for="(item, index) in courseList" :key="index">
            <router-link :to="item.href">
              <div class="course-item">
                <div
                  class="course-image"
                  :style="{ backgroundImage: `url(${item.image})` }"
                >
                  <span>{{ item.short_title }}</span>
                </div>
              </div>
            </router-link>
          </b-list-group-item>
          <b-list-group-item class="view-more">
            <router-link to="/course">
              <div class="course-item"><div>&#183;&#183;&#183;</div></div>
            </router-link>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
    <b-sidebar id="sidebar-sub" title="Sidebar" class="d-md-none" shadow>
      <b-form class="search-sidebar">
        <b-form-input
          size="md"
          class="mr-sm-2 search-input"
          placeholder="Search"
        >
        </b-form-input>
      </b-form>
      <div class="menu-sidebar">
        <b-list-group>
          <b-list-group-item v-for="(item, index) in menuList" :key="index">
            <router-link :to="item.href">
              <div class="icon">
                <img :src="item.icon" :alt="item.title" />
              </div>
              <div class="title">{{ item.title }}</div>
            </router-link>
          </b-list-group-item>
        </b-list-group>
      </div>

      <div class="list-course" v-if="$store.state.token">
        <div class="list-title">Khóa học</div>
        <b-list-group>
          <b-list-group-item v-for="(item, index) in courseList" :key="index">
            <router-link :to="item.href">
              <div class="course-item">
                <div class="course-image">
                  <img :src="item.image" :alt="item.title" />
                </div>
                <div class="course-title">{{ item.title }}</div>
              </div>
            </router-link>
          </b-list-group-item>
          <b-list-group-item class="view-more">
            <router-link to="#">
              <div class="course-item"><div>&#183;&#183;&#183;</div></div>
            </router-link>
          </b-list-group-item>
        </b-list-group>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import iconHome from "../../assets/images/sidebar/house.png";
import iconLearn from "../../assets/images/sidebar/learn.png";
import iconQuestion from "../../assets/images/sidebar/conversation.png";

import { Course } from "../../services/apis/ApiService";

export default {
  name: "SideBar",
  data() {
    return {
      menuList: [
        {
          title: "Home",
          href: "/",
          icon: iconHome,
        },
        {
          title: "Learn",
          href: "/login",
          icon: iconLearn,
        },
        {
          title: "Question",
          href: "/login",
          icon: iconQuestion,
        },
      ],
      courseList: [],
    };
  },

  watch: {
    "$store.state.token": function (vNew) {
      if (vNew) {
        this.menuList = [
          {
            title: "Home",
            href: "/",
            icon: iconHome,
          },
          {
            title: "Learn",
            href: "/courses",
            icon: iconLearn,
          },
          {
            title: "Question",
            href: "/forum",
            icon: iconQuestion,
          },
        ];
        Course.getList("0")
          .then((res) => {
            this.courseList = res.data.items.map((item) => {
              return {
                title: item.title,
                short_title: item.short_title,
                href: "/course/registered" + item.id,
                image: item.image,
              };
            });
          })
          .catch(() => {
            this.courseList = [];
          });
      } else {
        this.menuList = [
          {
            title: "Home",
            href: "/",
            icon: iconHome,
          },
          {
            title: "Learn",
            href: "/login",
            icon: iconLearn,
          },
          {
            title: "Question",
            href: "/login",
            icon: iconQuestion,
          },
        ];
        this.courseList = [];
      }
    },
  },

  mounted() {},
};
</script>

<style lang="scss" scope>
.os-sidebar {
  ::-webkit-scrollbar {
    opacity: 0;
    width: 5px;
  }

  &:hover {
    /* width */
    ::-webkit-scrollbar {
      opacity: 1;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #fff;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #ddd;
      opacity: 0.5;
      border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #fff;
    }
  }

  .sidebar-container {
    width: 96px;
    height: calc(100% - 86px);
    padding: 0 12px;
    position: fixed;
    top: 86px;
    left: 0;
    border-right: 1px solid #eee;
    z-index: 500;
    overflow-y: scroll;

    .menu-sidebar {
      .list-group-item {
        width: 72px;
        height: 60px;
        border-radius: 12px;
        margin: 10px 0;

        padding-left: 0;
        padding-right: 0;

        border: none;

        a {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          .icon {
            flex: 0 100%;
            text-align: center;
            img {
              width: 25px;
              height: 22px;
            }
          }
          .title {
            flex: 0 100%;
            font-size: 12px;
            font-weight: 700;
            text-align: center;
          }
        }
      }
    }

    .list-course {
      border-top: 1px solid #666;

      .list-title {
        margin: 20px 0;

        font-size: 14px;
        font-weight: 600;
      }
      .list-group-item {
        width: 100%;
        height: 60px;
        border-radius: 12px;
        margin: 10px 0;
        padding-left: 0;
        padding-right: 0;
        border: none;

        .course-item {
          display: flex;
          align-items: center;

          .course-image {
            height: 56px;
            flex: 0 100%;
            background: #fff;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;

            background-size: cover;
            background-position: center;

            span {
              width: 90%;
              background-color: rgba(0, 0, 0, 0.7);
              border-radius: 5px;
              font-weight: 800;
              padding: 0 5px;
              text-align: center;
              color: #fff;
              &:hover {
                color: red;
              }
            }
          }
        }
      }
    }
  }

  #sidebar-sub {
    .b-sidebar-header {
      strong {
        display: none;
      }

      button {
        border: 1px solid #aaa;
        border-radius: 10px;
      }
    }
    .b-sidebar-body {
      padding: 0 40px;

      .search-sidebar {
        margin: 10px 0 20px 0;
        .search-input {
          border-radius: 20px;
        }
      }

      .menu-sidebar {
        padding-bottom: 20px;

        .list-group-item {
          width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 10px 0;
          padding-left: 15px;
          padding-right: 15px;
          border: none;

          a {
            display: flex;
            align-items: center;

            .icon {
              flex: 0 40%;
              img {
                width: 25px;
                height: 22px;
              }
            }
            .title {
              flex: 0 60%;
              font-size: 12px;
              font-weight: 700;
            }
          }
        }
      }

      .list-course {
        border-top: 1px solid #666;
        .list-title {
          margin: 20px 0;

          font-size: 22px;
          font-weight: 600;
        }
        .list-group-item {
          width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 10px 0;
          padding-left: 0;
          padding-right: 0;
          border: none;

          .course-item {
            display: flex;
            align-items: center;

            .course-image {
              height: 56px;
              flex: 0 40%;
              background: #4682b4;
              border-radius: 10px;
              overflow: hidden;

              img {
                width: 100%;
                object-fit: cover;
              }
            }
            .course-title {
              flex: 0 60%;
              font-size: 12px;
              font-weight: 700;
              text-align: left;
              padding: 0 10px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
    }
  }

  .view-more {
    font-size: 15px;
    font-weight: 800;
    margin-top: 10px;

    .course-item {
      width: 100%;
      border: 1px dashed #ddd;
      border-radius: 5px;
      div {
        flex: 0 100%;
        text-align: center;
      }
    }
  }
}
</style>
