// miniprogram/pages/secondHand/goodDetail/goodDetail.js
const app = getApp()
const {
  $Message
} = require('../../../dist/base/index');
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
    },
    goodAnswers: [
      {
        answerPublisher: "吕昌泽",
        answerContent: "请问还有卖吗？",
      },
      {
        answerPublisher: "杨朝晖",
        answerContent: "我最爱这个了！",
      }
    ],
    myAnswer: '',
  },

  inputAnswer(e) {
    console.log(e.detail.value);
    this.setData({
      myAnswer: e.detail.value,
    })
  },

  publishGoodAnswer() {
    const blank = /^[ ]+$/;
    if (blank.test(this.data.myAnswer) || this.data.myAnswer === '') {
      $Message({
        content: '留言不得为空',
        type: 'error'
      });
      return;
    }
    var list = this.data.goodAnswers;
    list.push(
      {
      answerPublisher: app.globalData.userInfo.nickName,
      answerContent: this.data.myAnswer,
      }
      );
    this.setData({
      goodAnswers: list,
    })

    var that = this;
    wx.request({
      url: app.globalData.baseUrl+'/goodDetail_addAnswer',
      data: {
        currentGoodId: app.globalData.currentDetailGood,
        answerPublisher: app.globalData.openId,
        answerContent: that.data.myAnswer,
      },
      method:"POST",
      success(res) {
        $Message({
          content: '留言成功',
          type: 'success'
        });
      }
    });
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
              url: '../mine/mine',
            })
          } else {//这里是点击了取消以后
            // wx.navigateBack(1)
            return
          }
        }
      })
    }
    var that = this;
    this.setData({
      currentGoodId: app.globalData.currentDetailGood,
    })
    wx.request({
      //将当前页面的讨论Id发给后端
      url: app.globalData.baseUrl+'/goodDetail_onShow',
      data: {
        currentGoodId: that.data.currentGoodId,
      },
      method:"POST",
      success(res) {
        //得到返回的数据
        console.log(res.data)
        that.setData({
          currentGoodInformation: res.data.currentGoodInformation,
          goodAnswers:res.data.goodAnswers,
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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