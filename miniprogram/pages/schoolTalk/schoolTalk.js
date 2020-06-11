const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentSubPage: "recommend",
    currentTalks: [
      {
        talkName: "在绩点方面无敌是怎样一种感觉？",
        talkIntroduction: "来评论我",
        talkId: 212,
        talkPublisher: "吕昌泽",
        browseNum:10,
        praiseNum:9,
      },
    ]
  },

  handleChangeScroll({detail}) {
    var currentSubPage = detail.key;
    this.setData({
      currentSubPage: currentSubPage
    });
    var that = this;
    wx.request({
      //将当前页面的主题发给后端
      url: app.globalData.baseUrl + '/schoolTalk_view',
      data: {
        userOpenId: app.globalData.openId,
        currentSubPage:currentSubPage,
      },
      method: "POST",
      success(res) {
        console.log(res.data)
        that.setData({
          currentTalks: res.data.currentTalks
        });
      }
    });
  },

  gotoDetail: function (e) {
    app.globalData.currentDetailTalk = e.currentTarget.dataset.talk_id;
    wx.navigateTo({
      url: 'talkDetail/talkDetail',
    })
  },

  praiseHandle: function (e) {
    var targetTalkId = e.currentTarget.dataset.talk_id;
    console.log(targetTalkId)
    wx.request({
      url: app.globalData.baseUrl+'/schoolTalk_praise',
      data: {
        praiseTalkId:targetTalkId,
      },
      method:"POST",
      success(res) {}
    });
    var length = this.data.currentTalks.length;
    var that = this;
    for(var i = 0; i<length;i++){
      if(that.data.currentTalks[i].talkId === targetTalkId){
        var currentTalks = that.data.currentTalks;
        currentTalks[i].praiseNum +=1;
        that.setData({
          currentTalks : currentTalks
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
      url: app.globalData.baseUrl + '/schoolTalk_view',
      data: {
        userOpenId: app.globalData.openId,
      },
      method: "POST",
      success(res) {
        console.log(res.data)
        that.setData({
          currentTalks: res.data.currentTalks,
        })
      }
    });
  },
})