// utils/douban.js
"use strict";
var url = 'https://api.douban.com/v2/movie';

function fetchApi(type, params) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url + '/' + type,
      data: Object.assign({}, params),
      header: { 'Content-Type': 'json' },
      success: resolve,
      fail: reject
    });
  });
}

function find(type) {
  var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;
  var search = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

  var params = { start: (page - 1) * count, count: count, city: getApp().data.currentCity };
  return fetchApi(type, search ? Object.assign(params, { q: search }) : params).then(function (res) {
    return res.data;
  });
}

function findOne(id) {
  return fetchApi('subject/' + id).then(function (res) {
    return res.data;
  });
}

module.exports = { find: find, findOne: findOne };