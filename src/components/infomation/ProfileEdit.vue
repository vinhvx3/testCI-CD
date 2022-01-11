<template>
  <form
    action=""
    class="profile-edit-form"
    @submit="submitHandler"
  >
    <div class="form-control__custom form-controls name">
        <div class="col c-3"><label class="key">Full name:</label></div>
        <div class="col c-7"><input type="text" :placeholder="userInfo.name" v-model="tmpUser.name"/></div>
    </div>
    <div class="form-control__custom form-controls phone">
        <div class="col c-3"><label class="key">Phone number:</label></div>
        <div class="col c-7"><input type="text" :placeholder="userInfo.phone" v-model="tmpUser.phone"/></div>
    </div>
    <div class="form-control__custom form-controls email">
        <div class="col c-3"><label class="key">Email:</label></div>
        <div class="col c-7"><input type="text" :placeholder="userInfo.email" v-model="tmpUser.email"/></div>
    </div>
    <div class="form-control__custom form-controls position">
        <div class="col c-3"><label class="key">Position:</label></div>
        <div class="col c-7 level">{{userInfo.level == 1? 'Teacher' : 'Student'}}</div>
    </div>
    <!-- <div class="required" v-show="showRequiredEmail">
        <div class="col c-3 padding"></div>
        <div class="col c-7 inform">* Required</div>
    </div> -->

    <div class="buttons">
        <button type="button" class="cancel-btn" @click="onClickCancel()">Cancel</button>
        <button class="save-btn">Save</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ProfileEdit',
  data() {
    return {
      // showRequiredName: false,
      // showRequiredEmail: false,
      tmpUser: {
        name: "",
        phone: "",
        email: "",
      },
    };
  },
  methods: {
    onClickCancel() {
      this.tmpUser.name = "";
      this.tmpUser.phone = "";
      this.tmpUser.email = "";
      this.$emit('hide');
    },
    submitHandler(event) {
      event.preventDefault();

      //this.$emit('updateInfo', this.tmpUser);
      this.onClickCancel();
    }
  },
  props: {
    userInfo: {},
  },
  mounted() {
    // console.log(this.userInfo);
  },
}
</script>

<style lang="scss" scoped>
.profile-edit-form {
    font-family: 'Montserrat';
}

.key {
    text-align: left;
}

.form-controls {
    margin-top: 10px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-content: center;

    .key{
        margin: 0px 0px;
        color: #999;
    }
    // .key:after {
    //     content:" *";
    //     color: red;
    // }

    input {
        margin: 0px 0px;
        padding-left: 15px;
        
        &::-webkit-input-placeholder {
            color: #999;
        }
    }
}

.buttons {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    button {
        height: 36px;
        width: 108px;
        border-radius: 18px;
        border: none;
        font-weight: bold;
    }

    .save-btn {
        color: #fff;
        background-color: #6347c7;
    }

    .cancel-btn {
        color: #312366;
    }
}

.required {
    display: flex;
    justify-content: center;
    align-items: center;

    // .inform {
    //     padding-left: 30px;
    //     color: rgb(231, 3, 3);
    //     text-align: left;
    // }
}

.position {
    min-height: 44px;
    .level {
        padding-left: 30px;
        text-align: left;
        font-weight: bold;
        color: #666;
    }
}

</style>