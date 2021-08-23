<!-- 我的页面 -->
<template>
  <div class='my_page'>
    <el-menu
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
        <el-menu-item>新增记事</el-menu-item>
    </el-menu>
    <el-form ref="form" label-width="50px" style="margin-top: 20px">
      <el-form-item label="标题">
        <el-input v-model="title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 10}" v-model="content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add()">提交</el-button>
        <el-button @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import store from '../store/index.js'
export default {
  name: 'Add',
  store,
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      title: '',
      content: ''
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

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
      store.commit('addItem', {
        title: this.title,
        content: this.content,
        date: this.getdate()
      })
      this.title = ''
      this.content = ''
      this.$router.push('/home/list')
    },
    back () {
      this.$router.push('/home/list')
    },
    getdate () {
      const date = new Date()
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      const currentdate = year + '/' + month + '/' + strDate
      return currentdate
    }
  }
}
</script>
