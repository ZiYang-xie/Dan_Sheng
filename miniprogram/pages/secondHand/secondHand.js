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

  changeSubPage({
    detail
  }) {
    var currentSubPage = detail.key;
    this.setData({
      currentSubPage: currentSubPage,
    });
    wx.request({
      //将当前页面是推荐还是热榜发给后端
      url: app.globalData.baseUrl+'/secondHand_changeSubPage',
      data: {
        currentSubPage: currentSubPage,
        openId: app.globalData.openId,
      },
      success(res) {
        //得到返回的数据
        this.setData({
          currentGoods: res.data.currentGoods
        })
        console.log(res.data)
      }
    });
  },

  onLoad: function () {
    wx.request({
      //默认页面是推荐
      url: app.globalData.baseUrl+'/secondHand_recommend',
      data: {
        openId: app.globalData.openId,
      },
      success(res) {
        this.setData({
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
  },

  formSubmit: function (e) {
    var searchValue = e.detail.value.searchValue;
    wx.request({
      //将搜索内容发给后端
      url: app.globalData.baseUrl+'/secondHand_search',
      data: {
        searchValue: searchValue,
      },
      success(res) {
        //得到返回的数据
        this.setData({
          currentGoods: res.data.currentGoods,
        })
        console.log(res.data)
      }
    });
    console.log('form发生了submit事件，携带数据为：', searchValue)
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