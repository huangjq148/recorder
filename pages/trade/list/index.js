//index.js
//获取应用实例
const { EnumObj, $wuxForm } = getApp()
const tradeService = require("../../../service/trade")
const goodsService = require("../../../service/goods")
import dayjs from "dayjs"
const icon = 'data:image/png;base64,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'

// import img from "./add_trade.png"
// let img = require("./add_trade.png")

Page({
  data: {
    originList: [],
    list: [],
    current: 1,
    pageSize: 10,
    totalPage: 10,
    keyword: "",
    tradeType: {},
    buttons: [
      {
        label: '新增交易记录',
        icon,
        action: "addTrade"
      },
      {
        label: '显示查询条件',
        icon,
        action: "chooseCondition"
      }
    ],
    page: {
      currentPage: 1,
      pageSize: 15
    },
    isShowMore: false,
    datePicker: "",
    tradeDate_ge: dayjs().add(-1, 'month').format("YYYY-MM-DD"),
    tradeDate_le: dayjs().format("YYYY-MM-DD"),
    //左滑按钮
    right: [{
      text: '取消',
      style: 'background-color: #ddd; color: white'
    },
    {
      text: '删除',
      style: 'background-color: #F4333C; color: white'
    }]
  },

  addTrade() {
    wx.navigateTo({
      url: '/pages/trade/edit/index',
    })
  },

  chooseCondition() {
    this.setData({
      isShowMore: true,
    })
  },

  handleCloseMore() {
    this.setData({
      isShowMore: false,
    })
    this._resetPageInfo()
    const { setFieldsValue, getFieldsValue } = $wuxForm()
    let value = getFieldsValue()
    this._loadData();
  },

  onSelectDate(e) {
    this.setData({
      [e.currentTarget.dataset.id]: e.detail.label,
      ["searchForm." + e.currentTarget.dataset.id]: e.detail.label
    })
  },

  handleClickTap(e) {
    let fn = e.detail.buttons[e.detail.index].action
    this[fn]()
  },


  onLoad: function () {
    this.setData({
      tradeType: EnumObj["tradeType"]
    })
    // this._loadData();
  },

  //加载数据
  _loadData() {
    const _this = this;
    let { searchForm, page, list, isEnd } = _this.data

    if (!isEnd) {
      tradeService.getList({ whereMap: searchForm, ...page }).then(res => {
        if (res.resultObject && res.resultObject.length < page.pageSize) {
          isEnd = true;
        }
        _this.setData({
          isEnd,
          list: list.concat(res.resultObject)
        })
        // this.selectComponent("#goodsContainer").updated()
      })
    }else{
      wx.showToast({
        title: '已经加载完所有数据了',
        icon: 'none'
      })
    }
  },


  //输入框改变
  onChange(e) {
    this.setData({
      list: [],
      ["page.currentPage"]: 1,
      isEnd: false,
      ["searchForm.pinming_like"]: e.detail.value
    })
    this._loadData()
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

  _resetPageInfo() {

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
  }
})