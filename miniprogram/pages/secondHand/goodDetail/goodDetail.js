// miniprogram/pages/secondHand/goodDetail/goodDetail.js
const app = getApp()
const {$Message} = require('../../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentGoodId: app.globalData.currentDetailGood,
    currentGoodInformation: {
      goodName: "文具-笔",
      goodPrice: 5,
      goodReleaseTime: "2020/3/20",
      goodSeller: "谢子飏",
      goodIntroduction: "几支笔，学霸用它参加过高考，考上了复旦大学，感兴趣的话给我留言哦！",
      goodId: 1,
      goodImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587917214759&di=7f9b2d53641e3b67ba3f73ef86465dd1&imgtype=0&src=http%3A%2F%2Fwww.szthks.com%2Flocalimg%2F687474703a2f2f6777322e616c6963646e2e636f6d2f62616f2f75706c6f616465642f69322f543174526f355866426758585858585858585f2121302d6974656d5f7069632e6a7067.jpg",
      goodAnswers: [{
          answerPublisher: "吕昌泽",
          answerContent: "请问还有卖吗？",
        },
        {
          answerPublisher: "杨朝晖",
          answerContent: "我最爱这个了！",
        }
      ]
    },
    myAnswer: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentGoodId: app.globalData.currentDetailGood,
    })
    wx.request({
      //将当前页面的讨论Id发给后端
      url: '/goodDetail_onLoad',
      data: {
        currentGoodId: this.data.currentGoodId,
      },
      success(res) {
        //得到返回的数据
        this.setData({
          currentGoodInformation: res.data.currentGoodInformation
        })
        console.log(res.data)
      }
    });
  },

  inputAnswer(e) {
    console.log(e.detail.value);
    this.setData({
      myAnswer: e.detail.value,
    })
  },

  publishGoodAnswer() {
    const blank = /^[ ]+$/;
    if(blank.test(this.data.myAnswer) || this.data.myAnswer===''){
      $Message({
        content: '留言不得为空',
        type: 'error'
      });
      return;
    }
    let list = this.data.currentGoodInformation;
    list.goodAnswers.push({
      answerPublisher: app.globalData.userName,
      answerContent: this.data.myAnswer,
    });
    this.setData({
      currentGoodInformation: list,
    })
    wx.request({
      url: '/goodDetail_addAnswer',
      data: {
        answerPublisher: app.globalData.userName,
        answerContent: this.data.myAnswer,
      },
      success(res) {
      }
    });
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