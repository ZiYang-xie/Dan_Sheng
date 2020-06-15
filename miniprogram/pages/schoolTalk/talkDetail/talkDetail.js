// miniprogram/pages/schoolTalk/talkDetail/talkDetail.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTalkId: app.globalData.currentDetailTalk,
    currentTalkInformation: {
      talkName: "如何看待复旦大学的网课制度？",
      talkPublisher: "吕昌泽",
    },
    talkAnswers:[
        {
          answerPublisher:"杨朝晖",
          answerContent:"我觉得还行，毕竟像我这样的大佬随便A",
        },
        {
          answerPublisher:"吕昌泽",
          answerContent:"我觉得不行，像我这样的菜鸡都是C",
        },
      ]
  },

  jumpToPublishTalkAnswer(){
    app.globalData.currentDetailTalkName=this.data.currentTalkInformation.talkName;
    wx.navigateTo({
      url: 'publishTalkAnswer/publishTalkAnswer',
    })
  },

  onShow: function () {
    this.setData({
      currentTalkId : app.globalData.currentDetailTalk
    })
    console.log(this.data.currentTalkId)
    var that = this;
    wx.request({
      url:app.globalData.baseUrl+'/api/talkDetail_onShow',
      data: {
        currentTalkId:app.globalData.currentDetailTalk,
      },
      method:"POST",
      success(res) {
        console.log(res.data)
        that.setData({
          currentTalkInformation : res.data.data.currentTalkInformation,
          talkAnswers:res.data.data.talkAnswers,
        })
      }
    });
  },

})