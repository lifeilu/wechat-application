// pages/item/item.js
'use strict';
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    loading: true,
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    var _this = this
    app.douban.findOne(params.id).then(function(d) {
      _this.setData({title: d.title, movie: d, loading: false});
      wx.setNavigationBarTitle({ title: d.title + ' << 豆瓣电影' });
    }).catch(function(e) {
      _this.setData({title: '获取数据异常', movie: {}, loading: false});
      console.log(e);
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({ title: this.data.title + ' << 豆瓣电影'})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})