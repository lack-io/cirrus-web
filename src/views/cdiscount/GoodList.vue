<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">添加路径</a-button>
        <a-divider type="vertical" />
        <a-button type="danger" @click="handleClear">清空缓存</a-button>
        <a-divider type="vertical" />
        <a-button @click="handleFlush">刷新</a-button>
      </div>

      <a-modal
        title="添加路径"
        :visible="visible"
        :confirm-loading="modalLoading"
        ok-text="确定"
        cancel-text="取消"
        @ok="handleModalOk"
        @cancel="handleModalCancel"
      >
        <a-alert message="输入抓取的路径信息，必须以 https://www.cdiscount.com/ 为开头！" type="info" style="margin-bottom: 20px;text-align: center;" />
        <a-input v-model="pathText" />
      </a-modal>

      <a-table
        :columns="columns"
        key="ID"
        raw-key="ID"
        :data-source="dataSource"
        :pagination="pagination"
        :loading="loading"
        @change="handleChange"
      >
        <span slot="express" slot-scope="express">
          <a-tag
            :color="express != 'AUCUNE' ? 'geekblue' : 'green'"
          >
            {{ express }}
          </a-tag>
        </span>
        <span slot="scaleOut" slot-scope="scaleOut">
          <a-tag
            :color="scaleOut != 0 ? 'geekblue' : 'green'"
          >
            {{ scaleOut != 0 ? '缺货' : '有货' }}
          </a-tag>
        </span>
        <span slot="timestamp" slot-scope="timestamp">
          {{ tsToDate2(timestamp) }}
        </span>
        <template slot="action" slot-scope="text, record, index">
          <a :href="record.url" target="_blank">跳转</a>
          <a-divider type="vertical" />
          <a-popconfirm
            v-if="dataSource.length"
            title="是否删除该记录?"
            ok-text="是"
            cancel-text="否"
            @confirm="() => handleDel(record, index)"
          >
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </a-table>

    </a-card>
  </page-header-wrapper>
</template>

<script>
// import moment from 'moment'
import { getGoodList, deleteGood } from '@/api/good'
import { clearTask, startTask } from '@/api/task'
import { tsToDate } from '@/utils/util'

import StepByStepModal from '../list/modules/StepByStepModal'
import CreateForm from '../list/modules/CreateForm'

const columns = [
  {
    title: '商品ID',
    key: 'uid',
    dataIndex: 'uid',
    scopedSlots: { customRender: 'uid' }
  },
  {
    title: '品牌',
    key: 'express',
    dataIndex: 'express',
    scopedSlots: { customRender: 'express' }
  },
  {
    title: '评论数',
    key: 'comments',
    dataIndex: 'comments',
    scopedSlots: { customRender: 'comments' }
  },
  {
    title: '状态',
    key: 'scaleOut',
    dataIndex: 'scaleOut',
    scopedSlots: { customRender: 'scaleOut' }
  },
  {
    title: '拉取时间',
    key: 'timestamp',
    dataIndex: 'timestamp',
    scopedSlots: { customRender: 'timestamp' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '200px',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'GoodList',
  components: {
    CreateForm,
    StepByStepModal
  },
  data () {
    this.columns = columns
    return {
      // create model
      visible: false,
      modalLoading: false,
      loading: false,
      // 高级搜索 展开/关闭
      // 加载数据方法 必须为 Promise 对象
      dataSource: [],
      pagination: { pageSize: 10, current: 1, total: 0 },
      pathText: 'https://www.cdiscount.com/'
    }
  },
  mounted () {
    this.handleGetGoods(this.pagination)
  },
  methods: {
    handleChange (pagination, filters, sorter) {
      this.handleGetGoods(pagination)
    },
    handleGetGoods (pagination) {
      this.loading = true
      getGoodList(pagination.current, pagination.pageSize).then(res => {
        console.log(res.data)
        this.dataSource = res.data.list
        this.pagination = {
          total: res.data.pagination.total,
          pageSize: res.data.pagination.size,
          current: res.data.pagination.page
        }
      }).finally(() => {
        this.loading = false
      })
    },
    handleFlush () {
      this.pagination = { pageSize: 10, current: 1, total: 0 }
      this.handleGetGoods(this.pagination)
    },
    handleDel (record, index) {
      console.log('删除商品: ' + record.uid)
      deleteGood(record.ID).then(res => {
        this.handleGetGoods(this.pagination)
      })
    },
    tsToDate2 (timestamp) {
      return tsToDate(timestamp)
    },
    handleAdd () {
      this.visible = true
    },
    handleClear () {
      const _this = this
      this.$confirm({
        title: '是否清空缓存?',
        content: '清空缓存是会删除现有的已经爬取过的所有链接',
        onOk () {
          console.log('清空缓存')
          clearTask().then(res => {
            _this.$message.success('清空缓存成功')
          })
        },
        onCancel () {}
      })
    },
    handleModalOk () {
      // this.visible = true
      this.modalLoading = true
      startTask(this.pathText).then(res => {
        this.$message.success('成功添加爬取路径，请耐心等待抓取信息')
        this.visible = false
      }).finally(() => {
        this.modalLoading = false
      })
    },
    handleModalCancel () {
      this.visible = false
    }
  }
}
</script>
