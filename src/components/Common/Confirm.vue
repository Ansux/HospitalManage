<template>
  <div class="warp-confirm" v-show="cf.show">
    <div class="confirm">
      <div class="title"><span class="text">提示：</span><span class="btn-close" @click="close()">&times;</span></div>
      <div class="content">{{cf.text}}</div>
      <div class="btns"><a class="ok" @click="cf.ok()">确定</a><a class="cancel" @click="close()">取消</a></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      cf: {
        type: Object
      }
    },
    methods: {
      close() {
        this.cf.show = false
      }
    }
  }

</script>

<style lang="scss">
  .warp-confirm {
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, .1);
    z-index: 9999;
    .confirm {
      position: fixed;
      top: 50%;
      left: 50%;
      width: 300px;
      margin-top: -72px;
      margin-left: -150px;
      background: #eee;
      border: solid 1px #666;
      border-radius: 5px;
      box-shadow: rgba(0, 0, 0, .5) 0px 0px 20px;
      overflow: hidden;
      .title {
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        .text {
          font-weight: 500;
          font-size: 16px;
        }
        .btn-close {
          float: right;
          font-size: 20px;
          cursor: pointer;
        }
      }
      .content {
        border-top: solid 1px #ccc;
        border-bottom: solid 1px #ccc;
        padding: 15px 10px;
        font-size: 14px;
        color: #666;
      }
      .btns {
        padding: 10px;
        height: 50px;
        a {
          display: block;
          float: right;
          border: solid 1px #999;
          margin-left: 10px;
          padding: 0px 10px;
          height: 30px;
          line-height: 30px;
          text-decoration: none;
          border-radius: 3px;
          cursor: pointer;
          &.cancel {
            background: #fff;
            color: #333;
          }
          &.ok {
            background-color: #f00;
            color: #fff;
            border-color: #f00;
          }
        }
      }
    }
  }
</style>
