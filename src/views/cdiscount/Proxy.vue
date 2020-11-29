<template>
  <page-header-wrapper>
    <a-card :bordered="true">
      <a-descriptions title="代理信息">
        <a-descriptions-item label="名称">{{ proxy.name }}</a-descriptions-item>
        <a-descriptions-item label="neek">{{ proxy.neek }}</a-descriptions-item>
        <a-descriptions-item label="本机IP">{{ proxy.localIP }}</a-descriptions-item>
        <a-descriptions-item label="api_appKey">{{ proxy.api_appKey }}</a-descriptions-item>
        <a-descriptions-item label="balance_appKey">{{ proxy.balance_appKey }}</a-descriptions-item>
      </a-descriptions>
      <a-divider style="margin-bottom: 32px"/>
      <a-descriptions title="代理余额">
        <a-descriptions-item label="余额信息">{{ balance.cain }} {{ balance.amount }}</a-descriptions-item>
      </a-descriptions>
      <a-divider style="margin-bottom: 32px"/>

      <div class="title">代理白名单</div>
      <a-table
        :columns="columns"
        key="ID"
        raw-key="ID"
        :data-source="dataSource"
      >
        <span slot="updated_at" slot-scope="timestamp">
          {{ tsToDate2(timestamp) }}
        </span>
      </a-table>

    </a-card>
  </page-header-wrapper>
</template>

<script>
import { STable } from '@/components'
import { getProxy } from '@/api/proxy'
import { tsToDate } from '@/utils/util'

const columns = [
  {
    title: 'IP地址',
    key: 'mark_ip',
    dataIndex: 'mark_ip',
    scopedSlots: { customRender: 'mark_ip' }
  },
  {
    title: '更新时间',
    key: 'updated_at',
    dataIndex: 'updated_at',
    scopedSlots: { customRender: 'updated_at' }
  }
]

export default {
  components: {
    STable
  },
  data () {
    return {
      columns: columns,
      dataSource: [],
      proxy: {},
      balance: {},
      loading: {}
    }
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        'processing': '进行中',
        'success': '完成',
        'failed': '失败'
      }
      return statusMap[status]
    }
  },
  computed: {
    title () {
      return this.$route.meta.title
    }
  },
  mounted () {
    this.loading = true
    getProxy().then(res => {
      console.log(res.data)
      this.proxy = res.data.proxy
      this.balance = res.data.balance
      this.dataSource = this.proxy.whites
    }).finally(() => {
      this.loading = false
    })
  },
  methods: {
    tsToDate2 (timestamp) {
      return tsToDate(timestamp)
    }
  }
}
</script>

<style lang="less" scoped>
  .title {
    color: rgba(0,0,0,.85);
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
  }
</style>
