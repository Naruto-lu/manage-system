<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :size="size"
    @close="close">
    <slot v-if="hstyle"></slot>
    <div slot="footer">
      <slot name="footer"></slot>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      title: {
        type: String
      },
      show: { // 控制dialog的隐藏/显示
        default: false,
        type: Boolean
      },
      size: { // tiny,small,large,full
        type: String,
        default: 'small'
      },
      hiddenStyle: { // 控制弹窗关闭后再次开启，窗体内容是否维持上次关闭前的状态
        default: 'vshow',
        type: String
      }
    },
    data() {
      return {
        visible: this.show
      }
    },
    watch: {
      show(v) {
        this.visible = v
      },
      visible(v) { // 再次改变show的值，使dialog可以再次弹出
        this.$emit('update:show', v)
      }
    },
    computed: {
      hstyle() {
        return this.hiddenStyle == 'vshow' ? true : this.show
      }
    },
    methods: {
      close() {
        this.$emit('close')
      }
    }
  }
</script>