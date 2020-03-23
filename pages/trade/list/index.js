//index.js
//获取应用实例
const { EnumObj} = getApp()
const tradeService = require("../../../service/trade")
const goodsService = require("../../../service/goods")

Page({
  data: {
    originList: [],
    list: [],
    current: 1,
    pageSize: 10,
    totalPage: 10,
    keyword: "",
    goodsMap: {},
    tradeType: {},
    page: {
      currentPage: 1,
      pageSize: 9
    },
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
    this.setData({
      tradeType: EnumObj["tradeType"]
    })
    this._loadData();
    goodsService.getGoodList().then(res => {
      let obj = {}
      res.resultObject.map(item => {
        obj[item.id] = item.pinming
      })
      this.setData({
        goods: obj
      })
    })
  },

  //加载数据
  _loadData() {
    const _this = this;
    const page = _this.data.page
    tradeService.getList({ ...page }).then(res => {
      _this.setData({
        list: res.resultObject,
        totalPage: Math.ceil(res.totalRecord / _this.data.page.pageSize)
      })
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