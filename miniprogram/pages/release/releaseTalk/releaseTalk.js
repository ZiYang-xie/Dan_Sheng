// miniprogram/pages/releaseTalk/releaseTalk.js
const {$Message} = require('../../../dist/base/index');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showRightCata: false,
    talkType: [{
        id: 1,
        name: '选课',
      },
      {
        id: 2,
        name: '留学'
      },
      {
        id: 3,
        name: '娱乐'
      },
      {
        id: 4,
        name: '交友',
      },
      {
        id: 5,
        name: '其他',
      },
    ],
    talkName: '',
    talkIntroduction: '',
    talkClassification: '',
    position: 'left',
  },

  talkNameInput: function (e) {
    console.log(e.detail.value);
    this.setData({
      talkName: e.detail.value,
    })
  },

  talkIntroductionInput: function (e) {
    console.log(e.detail.value);
    this.setData({
      talkIntroduction: e.detail.value,
    })
  },

  handleCataChange({
    detail = {}
  }) {
    console.log(detail.value);
    this.setData({
      talkClassification: detail.value
    });
  },

  toggleRight1() {
    this.setData({
      showRightCata: !this.data.showRightCata
    });
  },

  publishTalk() {
    console.log(this.data.talkName);
    console.log(this.data.talkIntroduction);
    console.log(this.data.talkClassification);
    if (this.data.talkName === '' || this.data.talkIntroduction === '' || this.data.talkClassification === '') {
      $Message({
        content: '讨论名称、讨论简介、讨论分类均不得为空',
        type: 'error'
      });
      return;
    }
    if(app.globalData.openId === null){
      $Message({
        content: '请先登录',
        type: 'error'
      });
      return;
    }
    var that = this;
    wx.request({
      url: app.globalData.baseUrl+'/api/release_releaseTalk',
      data:{
        userOpenId:app.globalData.openId,
        userName:app.globalData.userInfo.nickName,
        talkName:that.data.talkName,
        talkIntroduction:that.data.talkIntroduction,
        talkClassification:that.data.talkClassification,
      },
      method:"POST",
      success(res) {
        console.log(res.data)
        $Message({
          content: '发布成功',
          type: 'success'
        });
        wx.navigateBack(1)
      }
    })
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
    if(app.globalData.openId === null){
      wx.showModal({
        title: '提示',
        content: '请先登录',
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
            console.log('用户点击确定')
            wx.switchTab({
              url: '../../mine/mine',
            })
          } else {//这里是点击了取消以后
            return
          }
        }
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