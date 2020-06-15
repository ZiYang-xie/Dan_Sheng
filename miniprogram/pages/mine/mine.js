// miniprogram/pages/mine/mine.js
var app = getApp();
const { $Toast } = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    userImgsrc: "../../images/user-unlogin.png",
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
    isLogin: app.globalData.isLogin,
    spinShow: true,
    switch: false
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

  clickLogin(e) {
    console.log(JSON.parse(e.detail.rawData))
    app.globalData.userInfo=JSON.parse(e.detail.rawData);
    console.log(app.globalData.userInfo)
    this.setData({
      userName: app.globalData.userInfo.nickName,
      userImgsrc: app.globalData.userInfo.avatarUrl
    })
    var that = this;
    wx.login({
      success(res) {
        console.log(res.code) //调用wx.login()可获取临时登录凭证code
        if (res.code) {
          $Toast({
            content: '加载中',
            type: 'loading'
          });
          wx.request({
            url: app.globalData.baseUrl + '/user/login',
            data: {
              code: res.code
            },
            success(resp) {
              var json = JSON.parse(resp.data.data)
              console.log(json.openid)
              app.globalData.openId = json.openid;
              app.globalData.isLogin = true;
              that.setData({
                isLogin: app.globalData.isLogin,
              })
              $Toast({
                content: '登录成功',
                type: 'success'
              });
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
          $Toast({
            content: '登录失败',
            type: 'error'
          });
        }
      }
    })
  },

  onLoad: function (options) {
    this.setData({
      isLogin: app.globalData.isLogin, //默认为未登录
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