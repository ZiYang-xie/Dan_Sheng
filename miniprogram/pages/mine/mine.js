// miniprogram/pages/mine/mine.js
var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "旦生",
    userImgsrc:"../../style/icon/mainIcon/mainIcon.png",
    visible: false,
    actions: [{
        name: '相册',
        icon: 'picture'
      },
      {
        name: '拍照',
        icon: 'camera'
      },
      {
        name: '取消',
        icon: 'close',
        color: '#959595'
      }
    ],
    isLogin:'',
  },
  /**
   * 用户点击改变头像事件
   */
  changeUserImg: function (event) {
    var _this = this;
    wx.showActionSheet({
      itemList: ['拍照', '从相册中选择'],
      success(res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) { //0是拍照
          wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['camera'],
            success: function (res) {
              var tempFilePaths = res.tempFilePaths
              _this.setData({
                userImgsrc: tempFilePaths,
              })
              //res.tempFilePaths[0] 这个是图片
            },
          })
        } else if (res.tapIndex == 1) {
          wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album'],
            success: function (res) {
              var tempFilePaths = res.tempFilePaths
              _this.setData({
                userImgsrc: tempFilePaths,
              })
              //res.tempFilePaths[0] 这个是图片
            },
          })
        }
      }
    })
  },

  gotoLogin(){
    wx.redirectTo({
      url: '../login/login',
    })
  },

  /**
   * 用户取消点击修改头像事件
   */
  // handleImgClick({
  //   detail
  // }) {
  //   app.globalData.tabBarHidden = false;
  //   switch (detail.index) {
  //     case 0: {
  //       wx.navigateTo({
  //         url: '../release/releaseGoods/releaseGoods',
  //       })
  //       break;
  //     };
  //   case 1: {
  //     wx.navigateTo({
  //       url: '../release/releaseTalk/releaseTalk',
  //     })
  //     break;
  //   };
  //   case 2: {
  //     this.setData({
  //       visible: false,
  //     });
  //     break;
  //   };
  //   }
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isLogin:app.globalData.isLogin,
    })
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        current: 'mine'
      })
    }
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