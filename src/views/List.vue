<!-- 我的页面 -->
<template>
  <div class='my_page'>
    <el-table
      :data="pageLists"
      stripe
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleWatch(scope.$index, scope.row)">查看</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="记事内容"
      :visible.sync="watchDialogVisible"
      :width="dialogWidth">
      <el-row style="font-size: 25px;font-weight: bold;">{{title}}</el-row>
      <el-row style="font-size: 14px;padding-top: 5px;">{{date}}</el-row>
      <el-row style="font-size: 20px;padding-top: 10px;">{{content}}</el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="watchDialogVisible = false">返回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import store from '../store/index.js'
export default {
  name: 'List',
  store,
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      watchDialogVisible: false,
      title: '',
      date: '',
      content: ''
    }
  },
  // 监听属性 类似于data概念
  computed: {
    pageLists () {
      return store.state.lists
    }
  },
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
    setDialogWidth () {
      const val = document.body.clientWidth
      const def = 600 // 默认宽度
      if (val < 1.2 * def) {
        this.dialogWidth = parseInt(0.9 * val) + 'px'
      } else {
        this.dialogWidth = def + 'px'
      }
    },
    handleWatch (index, scope) {
      this.title = scope.title
      this.date = scope.date
      this.content = scope.content
      this.watchDialogVisible = true
    },
    handleDelete (index) {
      this.$confirm('此操作将永久删除该篇记事, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.commit('deleteItem', { index })
        this.$notify({
          type: 'success',
          title: '删除成功!'
        })
      }).catch(() => {
        this.$notify({
          type: 'info',
          title: '已取消删除。'
        })
      })
    }
  }
}
</script>
