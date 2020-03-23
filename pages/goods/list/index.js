//index.js
//获取应用实例
const app = getApp()
const goodsService = require("../../../service/goods")

Page({
  data: {
    list: [],
    current: 1,
    totalPage: 10,
    keyword: "",
    isEnd: false, 
	scrollTop: 0,
    searchForm: {

    },
    page: {
      currentPage: 1,
      pageSize: 15
    },
    right: [{
      text: '取消',
      style: 'background-color: #ddd; color: white',
    },
    {
      text: '删除',
      style: 'background-color: #F4333C; color: white',
    }]
  },

  onLoad: function () {
    this._loadData();
  },
  onPageScroll(e) {
    console.log('onPageScroll', e.scrollTop)
    this.setData({
      scrollTop: e.scrollTop,
    })
  },

  //加载数据
  _loadData() {
    const _this = this;
    let { searchForm, page, list, isEnd } = this.data
    if(!isEnd){
      goodsService.getGoodList({ whereMap: searchForm, ...page }).then(res => {
        if (res.resultObject && res.resultObject.length < page.pageSize){
          isEnd = true;
        }
        _this.setData({
          isEnd,
          list: list.concat(res.resultObject),
          totalPage: Math.ceil(res.totalRecord / _this.data.page.pageSize)
        })
        this.selectComponent("#goodsContainer").updated()
      })
    }
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
      list: [],
      ["page.currentPage"]:1,
      isEnd: false,
      ["searchForm.pinming_like"]: e.detail.value
    })
    this._loadData();
  },

  onChangeFilter() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    this.setData({
      list: [],
      ["page.currentPage"]: 1,
      isEnd: false
    })
    this._loadData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let {page} = this.data
    this.setData({
      'page.currentPage': page.currentPage + 1
    })
    this._loadData()
  },

  //分页改变
  onChangePage(e) {
    this.setData({
      current: e.detail.current,
      'page.currentPage': e.detail.current
    })

    this._loadData();
  },

  onClick(e) {
    if (e.detail.value.text == "取消") return;
    let _this = this;
    let { item } = e.currentTarget.dataset
    wx.showModal({
      title: `是否删除该条数据？`,
      success: function () {
        goodsService.deleteById(item.id).then(res => {
          wx.showToast({
            title: '删除成功',
          })
          _this._loadData()
        })
      },
      fail() {
      }
    })
  }
})