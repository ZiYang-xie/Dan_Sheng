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

    wx.request({
      url: 'releaseTalk_release',
      data:{
        talkName:this.data.talkName,
        talkIntroduction:this.data.talkIntroduction,
        talkClassification:this.data.talkClassification,
      },
      success(res) {
        //得到返回的数据
        $Message({
          content: '发布成功',
          type: 'success'
        });
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