<!-- 我的页面 -->
<template>
    <div style="display: flex;justify-content: center;margin-top: 150px">
      <el-card>
      <el-row><el-button type="primary" icon='el-icon-edit' @click="add()">添加新记事</el-button></el-row>
      <el-row><el-button type="primary" icon='el-icon-info' @click="infoVisible = true">关于本程序</el-button></el-row>
      <el-row><el-button type="primary" icon='el-icon-error' @click="exit()">注销</el-button></el-row>
      </el-card>
      <!-- info页 -->
      <el-dialog
        title="关于该程序"
        :width="dialogWidth"
        :visible.sync="infoVisible">
        <el-row type="flex" justify="space-around" style="font-size: 25px;font-weight: bold;">
          轻记事
        </el-row>
        <el-row type="flex" justify="space-around">
          基于Vue+ElementUI设计的私人记事簿
        </el-row>
        <el-row type="flex">
          <el-col :span="7"></el-col>
          <el-col :span="3"><img :width="picWidth" src="../assets/vue.png"></el-col>
          <el-col :span="3"></el-col>
          <el-col :span="3"><img :width="picWidth" src="../assets/element.svg"></el-col>
        </el-row>
        <el-row type="flex" justify="space-around" style="text-align:center;line-height:200%">
          您的数据存储于LocalStorage中<br>
          不会泄露给任何第三方服务
        </el-row>
        <el-row type="flex" justify="space-around" style="color:dimgrey;">
          © 2021 SomiaWhiteRing.
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="infoVisible = false">我已了解</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      infoVisible: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.setDialogWidth()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    window.onresize = () => {
      return (() => {
        this.setDialogWidth()
      })()
    }
  },
  beforeCreate () { }, // 生命周期 - 创建之前
  beforeMount () { }, // 生命周期 - 挂载之前
  beforeUpdate () { }, // 生命周期 - 更新之前
  updated () { }, // 生命周期 - 更新之后
  beforeDestroy () { }, // 生命周期 - 销毁之前
  destroyed () { }, // 生命周期 - 销毁完成
  activated () { }, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
    add () {
      this.$router.push('/add')
    },
    setDialogWidth () {
      const val = document.body.clientWidth
      const def = 600 // 默认宽度
      if (val < 1.2 * def) {
        this.dialogWidth = parseInt(0.9 * val) + 'px'
        this.picWidth = parseInt(0.15 * val) + 'px'
      } else {
        this.dialogWidth = def + 'px'
        this.picWidth = '90px'
      }
    },
    exit () {
      this.$notify({
        title: '您已安全完成注销！',
        type: 'success'
      })
      sessionStorage.removeItem('token') // 删除token
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
</style>
