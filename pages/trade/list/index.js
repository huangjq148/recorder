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
    //左滑按钮
    right: [{
      text: '取消',
      style: 'background-color: #ddd; color: white',
    },
    {
      text: '删除',
      style: 'background-color: #F4333C; color: white',
    }],
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
        obj[item.id] = `${item.pinming}(规格：${item.guige})`
      })
      this.setData({
        goodsMap: obj
      })
    })
  },

  //加载数据
  _loadData() {
    const _this = this;
    let { searchForm, page, list, isEnd } = _this.data
    tradeService.getList({ whereMap: searchForm, ...page }).then(res => {
      if (res.resultObject && res.resultObject.length < page.pageSize) {
        isEnd = true;
      }
      _this.setData({
        isEnd,
        list: list.concat(res.resultObject)
      })
      this.selectComponent("#goodsContainer").updated()
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

  onClick(e) {
    if (e.detail.value.text == "取消") return;
    let _this = this;
    let { item } = e.currentTarget.dataset
    wx.showModal({
      title: `是否删除该条数据？`,
      success: function () {
        tradeService.deleteById(item.id).then(res => {
          wx.showToast({
            title: '删除成功',
          })
          _this._resetPageInfo()
          _this._loadData()
        })
      },
      fail() {
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._resetPageInfo()
    this._loadData();
  },

  _resetPageInfo(){

    this.setData({
      list: [],
      ["page.currentPage"]: 1,
      isEnd: false
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let { page } = this.data
    this.setData({
      'page.currentPage': page.currentPage + 1
    })
    this._loadData()
  },
})