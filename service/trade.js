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

exports.update = function (data) {
  return request({
    url: "/trade",
    method: 'PUT',
    data
  })
}

exports.getInfoById = function (id) {
  return request({
    url: `/trade/${id}`,
    method: 'get'
  })
}


exports.deleteById = function (id) {
  return request({
    url: `/trade/${id}`,
    method: 'delete'
  })
}