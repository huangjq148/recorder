// pages/recorder/edit/index.js
const { $wuxForm  } = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    types: {
      "0":"进货",
      "1":"出货"
    },
    formData:{
      type:"0"
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    const { getFieldsValue, getFieldValue, setFieldsValue } = $wuxForm()
    const value = getFieldsValue()
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