//用于调用全局变量
const app = getApp()

Page({
  data: {
    currentSubPage: "recommend",
    //当前页面的商品
    classes: [{
      i_class: "cards",
      i_class_header: "cards-header",
      i_class_content: "cards-content",
      i_class_content: "cards-content"
    }],
    currentGoods: [{
        goodName: "书籍-《浪潮之巅》",
        goodPrice: 20,
        goodReleaseTime: "2020/3/20",
        goodSeller:"谢子飏",
        goodIntroduction: "《浪潮之巅》吴军力作，推荐各位阅读！",
        goodId: 11,
        goodImg: "https://pic3.zhimg.com/478c568755d930fe8a2f15065b494fe8_1200x500.jpg",
        browseNum: 24,
        praiseNum: 10,
      },
      {
        goodName: "配饰-手表",
        goodPrice: 50,
        goodReleaseTime: "2020/3/25",
        goodSeller: "张三",
        goodIntroduction: "一款创意手表，喜欢的可以看一看啊",
        goodId: 2,
        goodImg: "https://cdn03.pinkoi.com/pinkoi.magz/tvzvjB9F/14650149183643.jpg",
        browseNum: 76,
        praiseNum: 22,
      }
    ],
  },

  changeSubPage({detail}) {
    var currentSubPage = detail.key;
    this.setData({
      currentSubPage: currentSubPage,
    });
    var that = this;
    wx.request({
      //将当前页面是推荐还是热榜发给后端
      url: app.globalData.baseUrl+'/secondHand_view',
      data: {
        currentSubPage: currentSubPage,
        userOpenId: app.globalData.openId,
      },
      method:"POST",
      success(res) {
        //得到返回的数据
        that.setData({
          currentGoods: res.data.currentGoods
        })
        console.log(res.data)
      }
    });
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        current: 'secondHand'
      })
    }
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
            return
          }
        }
      })
    }
    var that = this;
    wx.request({
      url: app.globalData.baseUrl+'/secondHand_view',
      data: {
        userOpenId: app.globalData.openId,
      },
      method:"POST",
      success(res) {
        console.log(res.data)
        that.setData({
          currentGoods: res.data.currentGoods
        })
      }
    });
  },

  formSubmit: function (e) {
    var that = this;
    var searchValue = e.detail.value.searchValue;
    wx.request({
      //将搜索内容发给后端
      url: app.globalData.baseUrl+'/secondHand_search',
      data: {
        searchValue: searchValue,
      },
      method:"POST",
      success(res) {
        //得到返回的数据
        that.setData({
          currentGoods: res.data.currentGoods,
        })
        console.log(res.data)
      }
    });
  },

  gotoDetail: function (e) {
    app.globalData.currentDetailGood = e.currentTarget.dataset.good_id;
    console.log(app.globalData.currentDetailGood);
    wx.navigateTo({
      url: 'goodDetail/goodDetail',
    })
  },

  praiseHandle: function (e) {
    var targetGoodId = e.currentTarget.dataset.good_id;
    console.log(targetGoodId)
    wx.request({
      //将搜索内容发给后端
      url: app.globalData.baseUrl+'/secondHand_praise',
      data: {
        praiseGoodId:targetGoodId,
      },
      method:"POST",
      success(res) {}
    });
    var length = this.data.currentGoods.length;
    for(var i = 0; i<length;i++){
      if(this.data.currentGoods[i].goodId === targetGoodId){
        var currentGoods = this.data.currentGoods;
        currentGoods[i].praiseNum +=1;
        this.setData({
          currentGoods : currentGoods
        })
        return;
      }
    }
  }

})