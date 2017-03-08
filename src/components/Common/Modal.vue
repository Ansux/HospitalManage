<template>
  <div class="modal fade" :id="id" tabindex="-1" data-backdrop="static">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" @click="close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">{{title}}</h4>
        </div>
        <div class="modal-body">
          <slot name="modal-body"></slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" @click="close">关闭</button>
          <button type="button" :disabled="validator" class="btn btn-primary" @click="save">提 交</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      id: {
        type: String,
        default: 'myModal'
      },
      validator: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      open() {
        $(`#${this.id}`).modal()
      },
      close() {
        $(`#${this.id}`).modal('hide')
      },
      save() {
        this.$emit('save')
      }
    }
  }

</script>
