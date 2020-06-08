// miniprogram/pages/mine/mine.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "旦生",
    userImgsrc: "../../style/icon/mainIcon/mainIcon.png",
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
    isLogin: '',
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

  gotoLogin() {
    wx.login({
      success(res) {
        console.log(res.code)//调用wx.login()可获取临时登录凭证code
        if (res.code) {
          wx.request({
            url: app.globalData.baseUrl+'/user/login',
            data: {
              code: res.code
            },
            header: {'content-type': 'application/x-www-form-urlencoded'},
            method: 'POST',
            dataType: 'json',
            success(resp) {
              app.globalData.openId = resp.data.openId;
              app.globalData.isLogin = true;
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  onLoad: function (options) {
    this.setData({
      isLogin: app.globalData.isLogin, //默认为未登录
    })
    // 查看是否授权
    var that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          //若已经授权，可以直接调用 getUserInfo 获取各个信息
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              app.globalData.userInfo = res.userInfo
              that.setData({
                userName: res.userInfo.nickName,
                userImgsrc: res.userInfo.avatarUrl
              })
            }
          })
        }
      }
    })
  },

  register() {

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