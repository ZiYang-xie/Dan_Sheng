// miniprogram/pages/mine/issue/issue.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentSubPage: "good",
    issuedGoods: [
      {
        goodName:"1",
        goodPrice:"123",
        goodIntroduction:"1111",
        goodId:141,
      },
      {
        goodName:"2",
        goodPrice:"234",
        goodIntroduction:"222",
        goodId:142,
      }
    ],
    issuedTalks:[
      {
        talkName:"a",
        talkIntroduction:"aaa",
        talkId:34
      },
      {
        talkName:"b",
        talkIntroduction:"bbb",
        talkId:35
      }
    ],
  },

  changeSubPage({detail}) {
    var currentSubPage = detail.key;
    this.setData({
      currentSubPage:currentSubPage,
    });
  },

  onShow: function () {
    var that = this;
    wx.request({
      url: app.globalData.baseUrl+'/mine_issue_onShow',
      data:{
        userOpenId:app.globalData.openId,
      },
      method:"POST",
      success(res){
        console.log(res.data)
        that.setData({
          issuedGoods:res.data.data.issuedGoods,
          issuedTalks:res.data.data.issuedTalks,
        })
      }
    })
  },

  gotoGoodDetail(e){
    app.globalData.currentDetailGood = e.currentTarget.dataset.good_id;
    console.log(app.globalData.currentDetailGood);
    wx.navigateTo({
      url: '../../secondHand/goodDetail/goodDetail',
    })
  },

  gotoTalkDetail(e){
    app.globalData.currentDetailGood = e.currentTarget.dataset.talk_id;
    console.log(app.globalData.currentDetailTalk);
    wx.navigateTo({
      url: '../../schoolTalk/talkDetail/talkDetail',
    })
  }
})