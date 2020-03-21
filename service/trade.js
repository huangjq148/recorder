const { request } = getApp()

exports.getList = function (data){
  return request({
    url: "/trade/list",
    method: 'POST',
    data
  })
}