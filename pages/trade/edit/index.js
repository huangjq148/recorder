// pages/recorder/edit/index.js
const { $wuxForm, $wuxSelect, EnumObj } = getApp();
const goodsService = require("../../../service/goods")
const tradeService = require("../../../service/trade")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //交易类型
    tradeType: {},
    //商品map
    goodsMap: [],
    //默认日期
    date: "2020-01-02",
    //进货/出货
    type: false
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    const { setFieldsValue,getFieldValue } = $wuxForm()
    this.setData({
      tradeType: EnumObj["tradeType"],
      date: (new Date()).toLocaleDateString().replace(/\//g, "-") 
    })
    //请求所有商品
    goodsService.getGoodList().then(res => {
      this.setData({
        goodsMap: res.resultObject.map(item => {
          return { value: item.id, title: item.pinming + "---" + item.guige }
        })
      })
      
      //如果有id，则请求交易记录信息
      if (options.id) {
        _this.setData({
          id: options.id
        })
        tradeService.getInfoById(options.id).then(res => {
          let pinmingLabel = "已删除"
          let filterArr = _this.data.goodsMap.filter(item => { return item.value == res.goodsId })
          if (filterArr.length>0){
            pinmingLabel = filterArr[0].title
          }
          _this._changeSwitchVlue(res)
          setFieldsValue({ ...res, pinmingLabel})
        })
      }
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
      options: this.data.goodsMap,
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

  _changeSwitchVlue(item){

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

  onFormFiledChange(e) {
    let _this = this
    const { form, changedValues, allValues } = e.detail
    _this._changeSwitchVlue(changedValues)
    console.log('onChange \n', changedValues, allValues)
  },

  //提交表单
  onSubmit() {
    const _this = this;
    const { getFieldsValue, getFieldValue, setFieldsValue } = $wuxForm()
    const value = getFieldsValue()
    let {id} = _this.data
    if (value.type){
      value.type = "1"
    }else{
      value.type = "0"
    }
    if (!value.goodsId){
      wx.showToast({
        title: '品名还未选择',
        icon: 'none'
      })
      return
    }
    if (id){
      tradeService.update({...value, id}).then(res => {
        wx.navigateBack({
          detal: 1,
          success() {
            wx.showToast({
              title: '保存成功',
            })
          }
        })
      })
    }else{
      tradeService.save(value).then(res => {
        wx.navigateBack({
          detal: 1,
          success() {
            wx.showToast({
              title: '保存成功',
            })
          }
        })
      })
    }
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