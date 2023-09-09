<template>
<div>
  <div class="card my-4">
    <div class="header">
        <slot name="custom-card-header"></slot>
    </div>
    <div class="card-body">
        <h5 :title="title" class="card-title m-0">{{ truncateText(title, 27) }}</h5>
        <slot name="custom-card-body"></slot>
    </div>
    <div class="card-footer">
        <slot v-if="needFooter" name="custom-card-footer"></slot>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true
    },
    needFooter: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    truncateText (source, size) {
      return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }
  }
})

</script>
<style lang="scss" scoped>
.header {
  overflow: hidden;
}
</style>