const { request } = getApp()

exports.getGoodList = function (data) {
  return request({
    url: "/goods/list",
    method: 'POST',
    data
  })
}

exports.getInfoById = function (id) {
  return request({
    url: `/goods/${id}`,
    method: 'get'
  })
}

exports.save = function (data) {
  return request({
    url: '/goods',
    method: 'post',
    data: data
  })
}

exports.update = function(data) {
  return request({
    url: '/goods',
    method: 'put',
    data: data
  })
},

exports.deleteById = function(id) {
  return request({
    url: `/goods/${id}`,
    method: 'delete'
  })
}