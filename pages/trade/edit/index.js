// pages/recorder/edit/index.js
const { $wuxForm, $wuxSelect, EnumObj } = getApp();
const goodsService = require("../../../service/goods")
const tradeService = require("../../../service/trade")
Page({

  /**
   * 页面的初始数据
   */
  data: {

    tradeType: {
      "0": "进货",
      "1": "出货"
    },
    goods: [],
    date: "2020-01-02",
    formData: {
      type: "0"
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tradeType: EnumObj["tradeType"]
    })
    goodsService.getGoodList().then(res => {
      this.setData({
        goods: res.resultObject.map(item => {
          return { value: item.id, title: item.pinming + "---" + item.guige }
        })
      })
    })
  }, 
  
  //修改日期
  onDatePickerChange(e) {
    this.setData({ date: e.detail.label })
  },

  onClick1() {
    const { setFieldsValue } = $wuxForm()
    $wuxSelect('#wux-pinming').open({
      value: this.data.value1,
      options: this.data.goods,
      onConfirm: (value, index, options) => {
        console.log('onConfirm', value, index, options)
        if (index !== -1) {
          setFieldsValue({ goodsId: value, pinmingLabel: options[index].title})
        }
      },
    })
  },

  onTypeChange(e) {
    this.onChange('type', e)
  },

  onChange(field, e) {
    this.setData({
      [field]: e.detail.value
    })
  },


  onFormFiledChange(e) {
    const { form, changedValues, allValues } = e.detail

    console.log('onChange \n', changedValues, allValues)
  },

  //提交表单
  onSubmit() {
    const _this = this;
    const { getFieldsValue, getFieldValue, setFieldsValue } = $wuxForm()
    const value = getFieldsValue()
    tradeService.save(value).then(res=>{
      wx.navigateBack({
        detal: 1,
        success(){
          wx.showToast({
            title: '保存成功',
          })
        }
      })
    })
    console.log(value)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  },


})