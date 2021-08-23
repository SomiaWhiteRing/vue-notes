<!-- 我的页面 -->
<template>
<div style="display: flex;justify-content: center;margin-top: 150px">
  <el-card class="box-card">
    <div slot="header">
      <span v-if="!inReg">登录</span>
      <span v-if="inReg">修改密码</span>
    </div>
    <el-form ref="form" :model="form" label-width="80px" v-if="!inReg">
      <el-form-item label="密码:">
        <el-input type="password" v-model="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login()">登录</el-button>
        <el-button @click="goReg()">修改密码</el-button>
      </el-form-item>
    </el-form>
    <el-form ref="form" :model="form" label-width="80px" v-else>
        <el-form-item label="旧密码:">
          <el-input placeholder="若无请留空" type="text" v-model="password"/>
        </el-form-item>
        <el-form-item label="新密码:">
          <el-input type="text" v-model="NewPass"/>
        </el-form-item>
        <el-form-item label="确认密码:">
          <el-input type="text" v-model="rePass"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="reg()">注册</el-button>
          <el-button @click="back()">返回</el-button>
        </el-form-item>
    </el-form>
  </el-card>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import store from '../store/index.js'
export default {
  store,
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      inReg: false,
      password: '',
      NewPass: '',
      rePass: ''
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
  beforeDestroy () { }, // 生命周期 - 销毁之前eslint --init
  destroyed () { }, // 生命周期 - 销毁完成
  activated () { }, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
    goReg () {
      this.inReg = true
    },
    back () {
      this.inReg = false
    },
    login () {
      if (localStorage.getItem('password') === null) {
        this.$notify({
          title: '您还未设置密码!',
          message: '请于修改密码界面进行初次设置',
          type: 'warning'
        })
        this.inReg = true
        return
      }
      if (this.password === localStorage.getItem('password')) {
        this.$router.push('/home/list')
      } else {
        this.$notify.error({
          title: '您输入的密码有误!'
        })
      }
    },
    reg () {
      if (this.NewPass === this.rePass) {
        if ((localStorage.getItem('password') === null) || (localStorage.getItem('password') === this.password)) {
          this.$notify({
            title: '密码设置成功!',
            message: '现在返回登陆界面',
            type: 'success'
          })
          if (localStorage.getItem('password') === null) {
            store.commit('addItem', {
              title: '欢迎来到轻记事！',
              content: '您可以在这里自由记录您的想法而不受任何第三方服务的监控。',
              date: this.getdate()
            })
          }
          localStorage.setItem('password', this.NewPass)
          this.password = this.NewPass
          this.inReg = false
        } else {
          this.$notify.error({
            title: '密码错误!',
            message: '请检查密码输入是否正确'
          })
        }
      } else {
        this.$notify.error({
          title: '两次密码输入不相同!',
          message: '请检查密码输入是否正确'
        })
      }
    }
  }
}
</script>
<style scoped>
.box-card {
    width: 480px;
  }
</style>
