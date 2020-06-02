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
      goodName: "书籍-《浪潮之巅》",
      goodPrice: 5,
      goodReleaseTime: "2020/3/20",
      goodSeller: "谢子飏",
      goodIntroduction: "《浪潮之巅》，吴军老师代表作，分析介绍了几大互联网公司的兴衰成败，经典推荐。感兴趣的话给我留言哦！",
      goodId: 1,
      goodImg: "https://pic3.zhimg.com/478c568755d930fe8a2f15065b494fe8_1200x500.jpg",
      goodAnswers: [{
          answerPublisher: "吕昌泽",
          publisherImg: "https://www.youmeitu.com/Upload/20181226/1545793149906684.jpg",
          answerContent: "请问还有卖吗？",
        },
        {
          answerPublisher: "杨朝晖",
          publisherImg: "https://wimg.ruan8.com/uploadimg/image/20190131/20190131130305_65861.jpg",
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