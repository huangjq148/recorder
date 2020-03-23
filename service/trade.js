const { request } = getApp()

exports.getList = function (data) {
  return request({
    url: "/trade/list",
    method: 'POST',
    data
  })
}

exports.save = function (data) {
  return request({
    url: "/trade",
    method: 'POST',
    data
  })
}