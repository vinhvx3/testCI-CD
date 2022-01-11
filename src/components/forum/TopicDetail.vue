<template>
  <div class="topic-detail">
    <div class="button-edit me-3" v-if="detail.editor == 1 && !topicEditing">
      <b-btn @click="changeEditTopic">
        <img src="../../assets/icons/edit.svg" alt="" />
      </b-btn>
    </div>
    <div class="my-5" v-if="!topicEditing">
      <b-card>
        <b-card-title class="d-inline-block title">
          {{ detail.title }}
        </b-card-title>
        <b-card-sub-title class="mb-5">
          {{
            detail.author ? `${detail.author} | ${detail.date}` : detail.date
          }}
        </b-card-sub-title>

        <b-card-text class="ql-editor" v-html="detail.content"></b-card-text>

        <b-link
          v-for="(item, index) in detail.tags"
          :key="index"
          href="#"
          class="card-link"
          >{{ item.name }}</b-link
        >
      </b-card>
      <button
        class="btn like"
        :class="detail.isLike == 1 ? 'active' : ''"
        @click="likeTopic"
      >
        <img src="../../assets/icons/like.png" alt="like" />
      </button>
      <span>{{ detail.likes }}</span>
    </div>

    <div v-else class="edit-topic">
      <div class="list-button mb-5">
        <!-- <b-button variant="danger" class="danger">Delete</b-button> -->
        <b-button
          variant="outline-primary"
          class="outline-primary"
          @click="cancelEditTopic"
        >
          Cancel
        </b-button>
        <b-button variant="success" class="success" @click="saveEditTopic">
          Save
        </b-button>
      </div>

      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-large">Title:</label>
        </b-col>
        <b-col sm="11" xl="8">
          <b-form-input
            id="input-large"
            size="lg"
            placeholder="Enter title"
            v-model="detailEdit.title"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-4">
        <b-col sm="2">
          <label for="input-large">description:</label>
        </b-col>
        <b-col sm="11" xl="8">
          <b-form-input
            id="input-large"
            size="lg"
            placeholder="Enter description"
            v-model="detailEdit.description"
          ></b-form-input>
        </b-col>
      </b-row>

      <div class="tags-input row">
        <div class="col-12 col-xl-10">
          <label for="tags-pills">Tags:</label>
          <b-form-tags
            input-id="tags-pills"
            v-model="detailEdit.tags"
            tag-variant="primary"
            tag-pills
            size="lg"
            separator=" "
            placeholder="Enter new tags separated by space"
            ref="tags"
            @tag-state="onChangeTags"
          ></b-form-tags>
          <div class="mt-2">
            <span>recommend : </span>
            <span
              v-for="(item, index) in detailEdit.recommendTags"
              :key="index"
            >
              <b-button
                variant="outline-primary"
                class="outline-primary"
                @click="addTags(item.name)"
              >
                {{ item.name }}
              </b-button></span
            >
          </div>
        </div>
      </div>
      <div class="content-editor mt-5">
        <EditorToolbar ref="editorDetail" />
      </div>
    </div>

    <div class="comment my-5">
      <h4>Answer: {{ comments.length }}</h4>
      <b-card no-body class="overflow-hidden mt-5">
        <b-row no-gutters>
          <b-col md="1">
            <img
              src="../../assets/icons/user-1.svg"
              alt="Image"
              class="avatar-user"
            />
          </b-col>
          <b-col md="11">
            <b-card-body>
              <EditorToolbar ref="editor" />
              <b-button
                variant="success"
                class="success my-3"
                @click="sendComment"
              >
                Send
              </b-button>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>

    <b-card
      no-body
      class="overflow-hidden mb-3"
      v-for="(item, index) in comments"
      :key="index"
    >
      <b-row no-gutters>
        <b-col md="1">
          <img
            src="../../assets/icons/user-1.svg"
            alt="Image"
            class="avatar-user"
            v-if="item.editor == '1'"
          />
          <img
            src="../../assets/icons/user-2.svg"
            alt="Image"
            class="avatar-user"
            v-else
          />
        </b-col>
        <b-col md="11">
          <b-card-body v-if="editIndex == index">
            <b-card-title>{{ item.user_name }}</b-card-title>
            <b-card-sub-title class="mb-3">{{ item.date }}</b-card-sub-title>
            <EditorToolbar ref="commentEditor" />
            <b-button
              variant="success"
              class="success my-3"
              @click="editComment(index, item.id)"
            >
              Send
            </b-button>
          </b-card-body>
          <b-card-body v-else>
            <b-card-title>{{ item.user_name }}</b-card-title>
            <b-card-sub-title class="mb-3">{{ item.date }}</b-card-sub-title>
            <div class="ql-editor comment-content" v-html="item.content"></div>
          </b-card-body>
          <div class="button-edit" v-if="item.editor == '1'">
            <b-button
              variant="danger"
              class="danger"
              v-if="editIndex == index"
              @click="deleteComment(item.id)"
              >Delete</b-button
            >
            <b-button
              variant="outline-primary"
              class="outline-primary"
              v-if="editIndex == index"
              @click="cancelEdit"
            >
              Cancel
            </b-button>

            <b-btn v-else @click="changeEdit(index)">
              <img src="../../assets/icons/edit.svg" alt="" />
            </b-btn>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { Topic } from "../../services/apis/ApiService";

import EditorToolbar from "../editor/EditorToolbar.vue";

export default {
  name: "TopicDetail",
  data() {
    return {
      detail: {},
      comments: [],
      editIndex: null,
      topicEditing: false,

      detailEdit: {
        title: "",
        description: "",
        tags: [],
        recommendTags: [],
        settimeoutGetTags: null,
      },
    };
  },
  components: {
    EditorToolbar,
  },
  created() {
    let _this = this;
    Topic.getDetail(this.$route.query.id).then((res) => {
      _this.detail = res.data.items;
      Topic.getComments(_this.detail.id).then((res) => {
        _this.comments = res.data.items.comments;
      });
    });
  },
  methods: {
    sendComment() {
      let _this = this;
      Topic.comment({
        topic_id: _this.detail.id,
        content: _this.$refs.editor.content,
      }).then((res) => {
        _this.comments = [res.data.items, ..._this.comments];
        _this.$refs.editor.content = "";
      });
    },
    changeEdit(index) {
      let _this = this;
      _this.editIndex = index;

      setTimeout(() => {
        _this.$refs.commentEditor[0].content = _this.comments[index].content;
      });
    },

    cancelEdit() {
      this.editIndex = null;
    },

    editComment(index, id) {
      let _this = this;
      let newContent = _this.$refs.commentEditor[0].content;
      Topic.comment({
        topic_id: _this.detail.id,
        id: id,
        content: newContent,
      }).then((res) => {
        _this.comments[index].content = newContent;
        this.cancelEdit();
      });
    },

    deleteComment(id) {
      let _this = this;
      Topic.deleteComment({
        topic_id: _this.detail.id,
        id: id,
      }).then((res) => {
        _this.cancelEdit();
        _this.comments = _this.comments.filter((item) => item.id != id);
      });
    },

    changeEditTopic() {
      this.topicEditing = true;
      this.detailEdit.title = this.detail.title;
      this.detailEdit.description = this.detail.description;
      this.detailEdit.tags = this.detail.tags.map((item) => item.name);
      this.detailEdit.recommendTags = [];
      this.detailEdit.settimeoutGetTags = null;
      setTimeout(() => {
        this.$refs.editorDetail.content = this.detail.content;
      });
    },

    onChangeTags(value) {
      clearTimeout(this.detailEdit.settimeoutGetTags);
      if (!value[0]) {
        this.detailEdit.recommendTags = [];
        return;
      }
      this.detailEdit.settimeoutGetTags = setTimeout(() => {
        Topic.getTagsByKey(value[0]).then((res) => {
          if (res.data.items.length) {
            this.detailEdit.recommendTags = res.data.items;
          } else {
            this.detailEdit.recommendTags = [{ name: value[0] }];
          }
        });
      }, 500);
    },

    addTags(value) {
      let _index = this.detailEdit.tags.findIndex((item) => item == value);
      if (_index >= 0) return;

      this.detailEdit.tags.push(value);
      this.detailEdit.recommendTags = [];
      this.$refs.tags.newTag = "";
    },

    saveEditTopic() {
      Topic.edit({
        id: this.detail.id,
        title: this.detailEdit.title,
        description: this.detailEdit.description,
        content: this.$refs.editorDetail.content,
        tags: this.detailEdit.tags,
      }).then((res) => {
        this.detail = res.data.items;
        this.cancelEditTopic();
      });
    },

    cancelEditTopic() {
      this.topicEditing = false;
    },

    likeTopic() {
      if (this.detail.isLike == 0) {
        Topic.like(this.detail.id).then(() => {
          this.detail.isLike = 1;
          this.detail.likes += 1;
        });
      } else {
        Topic.unlike(this.detail.id).then(() => {
          this.detail.isLike = 0;
          this.detail.likes -= 1;
        });
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scope>
.topic-detail {
  .title {
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    padding: 0 10px;
    font-weight: 700;
  }

  .card-link {
    background-color: rgba($color: #0d6efd, $alpha: 0.3);
    padding: 4px 5px 6px;
    border-radius: 5px;
    font-size: 12px;
  }

  .btn.like {
    border: solid 1px;
    margin: 20px;
    padding: 5px 10px;
    img {
      width: 20px;
      height: 20px;
      object-fit: cover;
      padding: 0;
      position: relative;
    }
  }

  .like.active {
    background-color: #0d6efd;
  }

  .avatar-user {
    width: 50px;
    height: 50px;
    padding: 5px;
    margin: 15px 0;
    border: solid 2px;
    border-radius: 50%;
  }

  .success {
    color: #fff;
    background-color: #198754;
    border-color: #198754;
    float: right;
  }

  .button-edit {
    position: absolute;
    right: 5px;
    top: 5px;
  }

  .btn {
    padding: 2px 10px;
    border: solid 1px;

    img {
      width: 12px;
      height: 12px;
      object-fit: cover;
      padding: 0;
    }
  }

  .outline-primary {
    color: #0d6efd;
    border-color: #0d6efd;
  }

  .danger {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
    margin-right: 30px;
  }

  .list-button {
    display: flex;
    justify-content: end;
  }

  .m-0 {
    display: block !important;
  }
  .badge {
    background-color: #0d6efd;
    border-radius: 20px;
  }

  .b-form-tag > button.b-form-tag-remove {
    border: none;
    background-color: #0d6efd;
  }

  .comment-content {
    min-height: 0 !important;
  }
}
</style>
