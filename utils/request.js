const wxp = require('./wx-promise')
const { domain } = require('../config/index')

function request(options, retryTime = 2) {
  return new Promise((resolve, reject) => { 
    return wxp.request({
      ...options,
      url: fixedDomain(options.url)
    }).then(({statusCode,data})=>{
      if(statusCode == 200 && data && data.code == 200){
        return resolve(data.data)
      } else {
        wx.showModal({
          title: '操作失败',
          content: data.data || data,
          showCancel: !1,
          cancelText: "知道了"
        })
      }
    }).catch(err=>{
      // wx.showModal({
      //   title: '温馨提示',
      //   content: '当前人数较多，请稍后再试',
      //   showCancel: false,
      //   success: () => {
      //     // showGlobalModal = false
      //   }
      // })
      cosole.error("请求出错")
      return reject(err)
    })
  })
}

function fixedDomain(url) {
  if (url.indexOf('http') === 0) {
    return url
  }

  return `${domain}${url}`
}


module.exports = {
  request,
}
