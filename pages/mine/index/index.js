//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    menus: [
      {
        name: "新增商品",
        url: "/pages/goods/edit/index",
        imgPath:"/images/mine/goods.png"
      },
      {
        name: "新增交易记录",
        url: "/pages/trade/edit/index",
        imgPath: "/images/mine/add_trade.png"
      },
      {
        name: "交易统计",
        url: "/pages/trade/statis/index",
        imgPath: "/images/mine/statistics.png"
      },
      {
        name: "查看登陆日志",
        url: "/pages/logs/logs",
        imgPath: "/images/mine/logs.png"
      }
    ]
  },
  handleGridTap(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
