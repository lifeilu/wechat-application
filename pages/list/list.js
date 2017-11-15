// pages/list/list.js
'use strict';
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    subtitle: '加载中...',
    type: 'in_theaters',
    loading: true,
    hasMore: true,
    page: 1,
    size: 20,
    movies: []
  },

  loadMore: function () {
    var _this = this;
    if (!this.data.hasMore) return;
    this.setData({ subtitle: '加载中...', loading: true });
    return app.douban.find(this.data.type, this.data.page++, this.data.size)
    .then(function (d) {
      if (d.subjects.length) {
        _this.setData({ subtitle: d.title, movies: _this.data.movies.concat(d.subjects), loading: false });
      } else {
        _this.setData({ subtitle: d.title, hasMore: false, loading: false });
      }
    }).catch(function (e) {
      _this.setData({ subtitle: '获取数据异常', loading: false });
      console.error(e);
    });
  },
  
  onLoad: function (params) {
    this.data.title = params.title || this.data.title;
    // 类型： in_theaters  coming_soon  us_box
    this.data.type = params.type || this.data.type;
    this.loadMore();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({ title: this.data.title + ' << 豆瓣电影' });
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
    this.setData({ movies: [], page: 1, hasMore: true });
    this.loadMore().then(function () {
      return wx.stopPullDownRefresh();
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})