//index.js
//获取应用实例
const { EnumObj, $wuxForm } = getApp()
const tradeService = require("../../../service/trade")
const goodsService = require("../../../service/goods")
import dayjs from "dayjs"
import {icons} from "./icon.js"

Page({
  data: {
    list: [],
    current: 1, 
    tradeType: {},
    type:"0",
    searchForm:{},
    //加号点击的扩展按钮
    buttons: [
      {
        label: '新增交易记录',
        icon: icons.addIcon,
        action: "addTrade"
      },
      {
        label: '显示查询条件',
        icon: icons.searchIcon,
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

  //关闭弹层时进行搜索
  handleCloseMore() {
    this.setData({
      isShowMore: false,
    })
    this._resetPageInfo()
    const { setFieldsValue, getFieldsValue } = $wuxForm()
    let value = getFieldsValue()
    if (value.type) {
      value.type = "1"
    } else {
      value.type = "0"
    }
    this._loadData();
  },

  onFormFiledChange(e) {
    let _this = this
    const { form, changedValues, allValues } = e.detail
    _this._changeSwitchVlue(changedValues)
    console.log('onChange \n', changedValues, allValues)
  },

  //选择分类改变的时候
  handleControlChange(e){
    let text = e.detail.values[e.detail.key]
    let value = ""
    switch (text) {
      case "全部":
        delete this.data.searchForm.type;
        break;
      case "进货":
        this.data.searchForm.type = "0"
        break;
      case "出货":
        this.data.searchForm.type = "1"
        break;
    }
  },

  //改变switch的值
  _changeSwitchVlue(item) {

    if (item.type === true || item.type === "1") {
      this.setData({
        type: true
      })
    } else if (item.type === false || item.type === "0") {
      this.setData({
        type: false
      })
    }
  },

  //搜索条件中的日期选择事件
  onSelectDate(e) {
    this.setData({
      [e.currentTarget.dataset.id]: e.detail.label,
      ["searchForm." + e.currentTarget.dataset.id]: e.detail.label
    })
  },

  //点击浮动按钮时，根据条件跳转对应方法
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

  //左滑删除事件
  onClick(e) {
    if (e.detail.value.text == "取消") return;
    let _this = this;
    let { item } = e.currentTarget.dataset
    wx.showModal({
      title: `是否删除该条数据？`,
      success: function (result) {
        if (result.confirm) {
          tradeService.deleteById(item.id).then(res => {
            wx.showToast({
              title: '删除成功',
            })
            _this._resetPageInfo()
            _this._loadData()
          })
        }
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

  //重置表格分页信息
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