// pages/board/board.js.js
'use strict';

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    boards: [{ key: 'in_theaters'}, {key: 'coming_soon'}, {key: 'top250'},
    //  { key: 'weekly' }, Required Scope: movie_advance_r
    //  { key: 'new_movies' }, Required Scope: movie_advance_r
     { key: 'us_box', name: '北美票房榜'}],
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;

    var promises = this.data.boards.map(function (board) {
      if (board.key === 'us_box') {
        return app.douban.find(board.key, 1, 10).then(function (d) {
          board.title = d.title;
          var arr = new Array
          d.subjects.forEach(function(item) {
            arr.push(item.subject)
          })
          board.movies = arr
          return board;
        });
      } else {
        return app.douban.find(board.key, 1, 10).then(function (d) {
          board.title = d.title;
          board.movies = d.subjects;
          return board;
        });
      }
    });
    Promise.all(promises).then(function (boards) {
      return _this.setData({ boards: boards, loading: false });
    });
  }
})