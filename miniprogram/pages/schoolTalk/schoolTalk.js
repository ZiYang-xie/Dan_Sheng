const app = getApp();
const { $Toast } = require('../../dist/base/index');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentSubPage: "recommend",
    currentTalks: [{
      talkName: "在绩点方面无敌是怎样一种感觉？",
      talkIntroduction: "来评论我",
      talkId: 212,
      talkPublisher: "吕昌泽",
      browseNum: 10,
      praiseNum: 9,
    }, {
      talkName: "怎么评价复旦大学疫情防控措施",
      talkIntroduction: "实验课同学返校了，你怎么看待复旦大学疫情防控措施？",
      talkId: 213,
      talkPublisher: "谢子飏",
      browseNum: 12,
      praiseNum: 2,
    },{
      talkName: "你觉得疫情什么时候能够结束呢？",
      talkIntroduction: "本次疫情世界范围内扩散，导致大家只能在家上网课，你觉得疫情什么时候能够结束？",
      talkId: 214,
      talkPublisher: "张三",
      browseNum: 32,
      praiseNum: 22,
    },{
      talkName: "如何评价网课制度",
      talkIntroduction: "网课事倍功半啊！",
      talkId: 215,
      talkPublisher: "李四",
      browseNum: 12,
      praiseNum: 11,
    },{
      talkName: "大家喜不喜欢周杰伦的新歌Mojito啊",
      talkIntroduction: "又是一年一度的周郎才尽（狗头",
      talkId: 215,
      talkPublisher: "周杰伦的迷妹",
      browseNum: 1002,
      praiseNum: 205,
    }]
  },

  handleChangeScroll({
    detail
  }) {
    var currentSubPage = detail.key;
    this.setData({
      currentSubPage: currentSubPage
    });
    var that = this;
    wx.request({
      //将当前页面的主题发给后端
      url: app.globalData.baseUrl + '/api/schoolTalk_view',
      data: {
        userOpenId: app.globalData.openId,
        currentSubPage: currentSubPage,
      },
      method: "POST",
      success(res) {
        console.log(res.data)
        that.setData({
          currentTalks: res.data.data
        });
      }
    });
  },

  gotoDetail: function (e) {
    app.globalData.currentDetailTalk = e.currentTarget.dataset.talk_id;
    console.log(app.globalData.currentDetailTalk)
    wx.navigateTo({
      url: 'talkDetail/talkDetail',
    })
  },

  praiseHandle: function (e) {
    var targetTalkId = e.currentTarget.dataset.talk_id;
    console.log(targetTalkId)
    wx.request({
      url: app.globalData.baseUrl + '/api/schoolTalk_praise',
      data: {
        praiseTalkId: targetTalkId,
      },
      method: "POST",
      success(res) {}
    });
    var length = this.data.currentTalks.length;
    var that = this;
    for (var i = 0; i < length; i++) {
      if (that.data.currentTalks[i].talkId === targetTalkId) {
        var currentTalks = that.data.currentTalks;
        currentTalks[i].praiseNum += 1;
        that.setData({
          currentTalks: currentTalks
        })
        return;
      }
    }
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        current: 'schoolTalk'
      })
    }
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + '/api/schoolTalk_view',
      data: {
        userOpenId: app.globalData.openId,
      },
      method: "POST",
      success(res) {
        console.log(res.data)
        that.setData({
          currentTalks: res.data.data,
        })
      }
    });
  },
})