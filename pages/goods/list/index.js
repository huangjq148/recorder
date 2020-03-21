//index.js
//获取应用实例
const app = getApp()
const goodsService = require("../../../service/goods")

Page({
  data: {
    originList: [],
    list: [],
    current: 1,
    totalPage: 10,
    keyword: "",
    page:{
      currentPage: 1, 
      pageSize: 9
    }
  },

  onLoad: function () {
    this._loadData();
    this._filterData();
  },

  //加载数据
  _loadData() {
    const _this = this;
    const page = this.data.page
    goodsService.getGoodList({ ...page }).then(res=>{
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
      'page.currentPage': e.detail.current
    })

    this._loadData();
    this._filterData();
  }
})