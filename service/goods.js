const { request } = getApp()

exports.getGoodList = function (data) {
  return request({
    url: "/goods/list",
    method: 'POST',
    data
  })
}