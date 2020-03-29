// pages/recorder/statis/index.js
const tradeService = require("../../../service/trade")
import dayjs from "dayjs"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    whereMap: {
      tradeDate_ge: dayjs().add(-1, 'month').format("YYYY-MM-DD"),
      tradeDate_le: dayjs().format("YYYY-MM-DD")
    },
    info: {
      //总花费
      purTotal: 0,
      //总售价
      sellTotal: 0,
      //总利润
      profitTotal: 0
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //日期选择框确认事件
  onConfirm(e) {
    const { index, mode } = e.currentTarget.dataset
    // this.setValue(e.detail, index, mode)
    this.setData({
      ["whereMap." + e.currentTarget.dataset.id]: e.detail.label
    })
    this._loadData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 加载数据
   */
  _loadData() {
    const _this = this;
    const { whereMap } = _this.data
    tradeService.getStatistics({ whereMap }).then(res => {
      _this.setData({
        info: res
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._loadData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log(1)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})