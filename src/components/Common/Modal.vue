<template>
  <div class="modal fade" id="modal_depart" tabindex="-1" role="dialog" data-backdrop="static">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title"></h4>
        </div>
        <div class="modal-body">
          <slot name="modal-body"></slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" :disabled="validator" class="btn btn-primary" @click="save">提 交</button>
        </div>
      </div>
    </div>
  </div>
</template>
