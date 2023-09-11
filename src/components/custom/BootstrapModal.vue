<template>
    <div>
        <div ref="modal" :id="modalId" :style="{display: isOpen? 'block' : 'none'}" class="modal fade background-darken" tabindex="-1" role="dialog" :class="{show:isShow}" @keyup.esc="close(false)">
            <div class="modal-dialog" :class="[modalSize, {'modal-dialog-centered': verticallyCentered}]" role="document">
                <div class="modal-content">
                    <div v-if="needHeader" class="modal-header d-flex flex-row-reverse">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close(false)"><span aria-hidden="true">&times;</span></button>
                        <h5 class="modal-title">
                            <slot name="title"></slot>
                        </h5>
                    </div>
                    <div class="modal-body">
                        <slot name="body"></slot>
                    </div>
                    <div v-if="needFooter" class="modal-footer d-flex justify-content-end">
                        <slot name="footer"></slot>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!-- /.modal -->
    </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    needHeader: {
      type: Boolean,
      default: true
    },
    needFooter: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: ''
    },
    modalId: {
      type: String
    },
    verticallyCentered: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      sizeClasses: {
        'large': 'modal-lg',
        'small': 'modal-sm',
        'medium': 'modal-md',
        'full': 'modal-full'
      },
      isOpen: false,
      isShow: false
    }
  },
  methods: {
    open () {
      this.isOpen = true
      this.$nextTick(() => {
        this.isShow = true
        this.$refs.modal.focus()
        document.body.classList.add('modal-open')
      })
    },
    close (success) {
      this.isShow = false
      this.$emit('closed', success !== undefined ? success : false)
      this.$nextTick(() => {
        setTimeout(() => {
          this.isOpen = false
          document.body.classList.remove('modal-open')
        }, 500)
      })
    }
  },
  computed: {
    modalSize () {
      return this.sizeClasses[this.size] || ''
    }
  }
})
</script>

<style scoped lang="scss">
  .background-darken {
    background: rgba(0, 0, 0, 0.3);
  }
  .modal {
    overflow-x: hidden;
    overflow-y: auto;
  }
  .modal-full {
    margin-left: 16px;
    margin-right: 16px;
    width: auto;
  }
</style>