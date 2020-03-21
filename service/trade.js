const { request } = getApp()

exports.getList = function(){
  return request({
    url: "/trade/list",
    method: 'POST',
    data
  })
}