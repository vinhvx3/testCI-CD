<template>
  <div class="create-topic">
    <div class="list-button mb-5">
      <!-- <b-button variant="danger" class="danger">Delete</b-button> -->
      <b-button
        variant="outline-primary"
        class="outline-primary"
        @click="cancel"
      >
        Cancel
      </b-button>
      <b-button variant="success" class="success" @click="saveTopic">
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
          v-model="title"
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
          v-model="description"
        ></b-form-input>
      </b-col>
    </b-row>

    <div class="tags-input row">
      <div class="col-12 col-xl-10">
        <label for="tags-pills">Tags:</label>
        <b-form-tags
          input-id="tags-pills"
          v-model="tags"
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
          <span v-for="(item, index) in recommendTags" :key="index">
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
      <EditorToolbar ref="editor" />
    </div>
  </div>
</template>

<script>
import EditorToolbar from "../editor/EditorToolbar.vue";
import { Topic } from "../../services/apis/ApiService";

export default {
  name: "CreateTopic",
  data() {
    return {
      title: "",
      description: "",
      tags: [],
      recommendTags: [],
      settimeoutGetTags: null,
    };
  },
  components: {
    EditorToolbar,
  },
  methods: {
    onChangeTags(value) {
      clearTimeout(this.settimeoutGetTags);
      if (!value[0]) {
        this.recommendTags = [];
        return;
      }
      this.settimeoutGetTags = setTimeout(() => {
        Topic.getTagsByKey(value[0]).then((res) => {
          if (res.data.items.length) {
            this.recommendTags = res.data.items;
          } else {
            this.recommendTags = [{ name: value[0] }];
          }
        });
      }, 500);
    },

    addTags(value) {
      let _index = this.tags.findIndex((item) => item == value);
      if (_index >= 0) return;

      this.tags.push(value);
      this.recommendTags = [];
      this.$refs.tags.newTag = "";
    },

    saveTopic() {
      Topic.create({
        title: this.title,
        description: this.description,
        content: this.$refs.editor.content,
        tags: this.tags,
      }).then((res) => {
        this.$router.replace({ path: `/forum/detail?id=${res.data.items.id}` });
      });
    },

    cancel() {
      this.$router.push({ name: "forum" });
    },
  },
};
</script>

<style lang="scss" scope>
.create-topic {
  .list-button {
    display: flex;
    justify-content: end;
  }

  .btn {
    padding: 5px 15px !important;
  }

  .danger {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
    margin-right: 30px;
  }
  .outline-primary {
    color: #0d6efd;
    border-color: #0d6efd;
    border: solid 1px;
  }
  .success {
    color: #fff;
    background-color: #198754;
    border-color: #198754;
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
}
</style>