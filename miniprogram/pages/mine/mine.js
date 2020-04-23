// miniprogram/pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:"mine",
    visible: false,
    chooseButton: [{
        name: '发布二手商品',
        icon: 'shop_fill'
      },
      {
        name: '发布校园讨论',
        icon: 'group_fill'
      },
      {
        name: '取消',
        icon: 'close'
      }
    ],
  },

  barChange ({ detail }) {
    this.setData({
        current: detail.key,
    });
    var _current=detail.key;
    switch(_current){
      case "secondHand":{
        wx.redirectTo({
          url: '../secondHand/secondHand',
        })
        break;
      };
      case "schoolTalk":{
        wx.redirectTo({
          url: '../schoolTalk/schoolTalk',
        })
        break;
      };
      case "add": {
        this.setData({
          visible: true,
        });
        break;
      };
      case "information":{
        wx.redirectTo({
          url: '../information/information',
        })
        break;
      };
    }
},

handleAddClick({detail}){
  switch(detail.index){
    case 0:{
      wx.navigateTo({
        url: '../release/releaseGoods/releaseGoods',
      })
      break;
    };
    case 1:{
      wx.navigateTo({
        url: '../release/releaseTalk/releaseTalk',
      })
      break;
    };
    case 2:{
      this.setData({
        visible: false,
      });
      break;
    };
  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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