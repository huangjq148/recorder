//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    originList: [],
    list: [],
    current: 1,
    pageSize: 10,
    totalPage: 10,
    keyword: "",
    items: [{
        type: 'radio',
        label: '交易类型',
        value: '',
        checked: true,
        children: [{
            label: '全部',
            value: '',
          }, {
            label: '进货',
            value: '0',
            checked: true, // 默认选中
          },
          {
            label: '出货',
            value: '1',
          },
        ],
        groups: ['001'],
    },
      {
        type: 'sort',
        label: '交易时间',
        value: 'stars',
        groups: ['003'],
      },
      {
        type: 'date',
        label: '交易时间',
        value: 'stars',
        groups: ['003'],
      }
    ]
  },

  onLoad: function() {
    this._loadData();
    this._filterData();
  },

  //加载数据
  _loadData() {
    let {
      pageSize
    } = this.data;
    let originList = [];
    let prices = ["进价", "售价"]
    for (let i = 0; i < pageSize; i++) {
      originList.push({
        pinming: `药品${(this.data.current - 1) * pageSize + i + 1}`,
        price: (Math.random() * 10).toFixed(2),
        type: prices[parseInt(Math.random() * 10) % 2],
        date: "2020-02-03"
      })
    }

    this.setData({
      originList
    })
  },

  //过滤数据
  _filterData() {
    let {
      keyword
    } = this.data;
    let list = this.data.originList.filter(item => {
      return item.pinming.indexOf(keyword) >= 0;
    })

    this.setData({
      // current: 1,
      list
    })
  },

  //输入框改变
  onChange(e) {
    this.setData({
      keyword: e.detail.value
    })
    this._filterData()
  },

  onChangeFilter() {

  },

  //分页改变
  onChangePage(e) {
    this.setData({
      current: e.detail.current,
    })

    this._loadData();
    this._filterData();
  }
})