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
    const blank = /^[ ]+$/;
    if (blank.test(this.data.myAnswer) || this.data.myAnswer === '') {
      $Message({
        content: '留言不得为空',
        type: 'error'
      });
      return;
    }
    var that = this;
    wx.request({
      url: app.globalData.baseUrl+'/api/goodDetail_addAnswer',
      data: {
        currentGoodId: app.globalData.currentDetailGood,
        answerPublisher: app.globalData.openId,
        userName:app.globalData.userInfo.nickName,
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


  },

  onShow: function () {
    var that = this;
    this.setData({
      currentGoodId: app.globalData.currentDetailGood,
    })
    wx.request({
      url: app.globalData.baseUrl+'/api/goodDetail_onShow',
      data: {
        currentGoodId: that.data.currentGoodId,
      },
      method:"POST",
      success(res) {
        console.log(res.data)
        that.setData({
          currentGoodInformation: res.data.data.currentGoodInformation,
          goodAnswers:res.data.data.goodAnswers,
        })
      }
    });
  },
})