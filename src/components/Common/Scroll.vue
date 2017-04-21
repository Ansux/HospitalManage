<template>
  <div class="scroll-bar" ref="wrap" @mousewheel="mousewheelHandler">
    <div class="content" :style="contentStyle" ref="content">
      <slot></slot>
    </div>
    <div class="thumb" :style="thumbStyle" ref="thumb">
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contentOffsetHeight: 0,
      contentScrollHeight: 0,
      maxScrollHeight: 0,
      thumbHeight: 0,
      contentTop: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.contentOffsetHeight = this.$refs.wrap.offsetHeight
      this.contentScrollHeight = this.$refs.wrap.scrollHeight
      this.thumbHeight = this.contentOffsetHeight / (this.contentScrollHeight / this.contentOffsetHeight)
      this.maxScrollHeight = this.contentScrollHeight - this.contentOffsetHeight
    })
  },
  computed: {
    thumbStyle() {
      return {
        height: `${this.thumbHeight}px`,
        top: `${this.contentOffsetHeight * (-this.contentTop / this.contentScrollHeight)}px`
      }
    },
    contentStyle() {
      return {
        top: `${this.contentTop}px`
      }
    }
  },
  methods: {
    mousewheelHandler() {
      this.contentTop += event.wheelDelta
      this.contentTop = this.contentTop > 0 ? 0 : this.contentTop < -this.maxScrollHeight ? -this.maxScrollHeight : this.contentTop
    }
  }
}
</script>

<style lang="scss">
.scroll-bar {
  position: relative;
  height: 400px;
  border: solid 1px #000;
  overflow-y: hidden;
  .content {
    position: absolute;
    left: 0;
    right: 0;
  }
  .thumb {
    position: absolute;
    right: 0;
    width: 10px;
    height: 80px;
    background-color: blue;
  }
}
</style>
