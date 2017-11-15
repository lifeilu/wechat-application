//app.js
'use strict';
var douban = require('./utils/douban.js');

App({
  data: {
    name: 'Douban Movie',
    version: '1.1.0',
    currentCity: '上海'
  },
  douban: douban,
  getUserInfo: function () {
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
      }
    })
  },
  onLaunch: function () {
    var that = this
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log('用户登录成功！' + res)
          that.getUserInfo()
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  }
})