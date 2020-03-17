//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    originList: [],
    list: [],
    current: 1,
    pageSize: 8,
    totalPage: 10
  },

  onLoad: function () {
    this._loadData();
    this._filterData("");
  },

  //加载数据
  _loadData(){
    let { pageSize } = this.data;
    let originList = [];
    let prices = ["进价","售价"]
    for (let i = 0; i < pageSize; i++) {
      originList.push({
        pinming: `药品${(this.data.current - 1) * pageSize + i + 1}`,
        price: (Math.random() * 10).toFixed(2),
        type: prices[parseInt(Math.random() * 10) % 2],
        date: "2020-02-03"
      })
    }

    this.setData({
      originList
    })
  },

  //过滤数据
  _filterData(keyWord){
    let list = this.data.originList.filter(item => {
      return item.pinming.indexOf(keyWord) >= 0;
    })

    this.setData({
      list
    })
  },

  //输入框改变
  onChange(e){
    this._filterData(e.detail.value)
  },

  //分页改变
  onChangePage(e){
    this.setData({
      current: e.detail.current,
    })

    this._loadData();
    this._filterData("");
  }
})
