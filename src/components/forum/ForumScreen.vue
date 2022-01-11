<template>
  <div class="forum-screen">
    <div class="create d-flex">
      <router-link class="link-create" to="/forum/create">
        <button class="btn btn-success">
          <span class="me-3">Create</span>
          <b-icon icon="plus-square" aria-hidden="true" class="ml-2" />
        </button>
      </router-link>
    </div>
    <div class="header row justify-content-between">
      <div class="col">
        <h4 class="float-start">Topic: {{ selected }}</h4>
      </div>
      <div class="col">
        <b-form-select
          v-model="selected"
          :options="options"
          size="sm"
          class="mt-3 float-end"
          value-field="name"
          text-field="name"
        ></b-form-select>
      </div>
    </div>

    <div class="list my-5">
      <b-card class="my-5" v-for="(item, index) in list" :key="index">
        <b-card-title>
          <router-link :to="{ name: 'TopicDetail', query: { id: item.id } }">
            {{ item.title }}
          </router-link>
        </b-card-title>
        <b-card-text>
          {{ item.description }}
        </b-card-text>
        <b-card-text class="small text-muted row justify-content-between">
          <div class="col">
            <span
              class="tag-item"
              v-for="(el, _index) in item.tags"
              :key="_index"
            >
              {{ el.name }}
            </span>
          </div>
          <div class="like-comment col">
            <div class="float-end row pe-3">
              <div class="col">
                <div class="row">
                  <img src="../../assets/icons/like.png" alt="like" />
                  {{ item.likes }}
                </div>
              </div>
              <div class="col">
                <div class="row">
                  <img src="../../assets/icons/comment.png" alt="comment" />
                  {{ item.comments }}
                </div>
              </div>
            </div>
          </div>
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
import { Topic } from "../../services/apis/ApiService";

export default {
  name: "ForumScreen",
  data() {
    return {
      selected: "tất cả",
      options: [{ name: "tất cả" }],
      list: [],
    };
  },
  methods: {},
  created() {
    Topic.getTags().then((res) => {
      this.options = [...this.options, ...res.data.items];
    });

    Topic.getList().then((res) => {
      this.list = res.data.items;
    });
  },
  mounted() {},
};
</script>

<style lang="scss" scope>
.forum-screen {
  .create {
    .link-create {
      margin-left: auto;

      button {
        color: #fff;
        background-color: #157347;
        border-color: #146c43;
      }
    }
  }

  .header {
    select {
      padding: 10px 20px;
      border-radius: 10px;
    }
  }

  .like-comment {
    width: auto;
    img {
      width: 15px;
      height: 15px;
      object-fit: cover;
      padding: 0;
      margin-left: 20px;
      margin-right: 10px;
      position: relative;
      top: 3px;
    }
  }

  .tag-item {
    background-color: rgba($color: #0d6efd, $alpha: 0.3);
    padding: 4px 5px 6px;
    margin-right: 10px;
    border-radius: 5px;
  }
}
</style>