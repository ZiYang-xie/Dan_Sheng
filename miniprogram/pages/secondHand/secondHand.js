//用于调用全局变量
const app = getApp()

Page({
  data: {
    currentSubPage: "recommend",
    //当前页面的商品
    currentGoods: [{
        goodName: "娃娃",
        goodPrice: "30元",
        goodReleaseTime: "2020/3/20",
        goodSeller: "吕昌泽",
        goodIntroduction: "无",
        goodPicture: "",
      },
      {
        goodName: "大娃娃",
        goodPrice: "50元",
        goodReleaseTime: "2020/3/25",
        goodSeller: "吕昌泽",
        goodIntroduction: "哈哈哈",
        goodPicture: ""
      }
    ]
  },

  changeSubPage({detail}) {
    var currentSubPage = detail.key;
    this.setData({
      currentSubPage: currentSubPage,
    });
    wx.request({
      //将当前页面是推荐还是热榜发给后端
      url: '/secondHand_changeSubPage',
      data: {
        currentSubPage: currentSubPage,
        userName: app.globalData.userName,//全局变量
      },
      success(res) {
        //得到返回的数据
        this.currentGoods = res.data.currentGoods;
        console.log(res.data)
      }
    });
  },

  onLoad: function () {
    wx.request({
      //默认页面是推荐，所以进入时应该
      url: '/secondHand_recommend',
      data: {
        //发送给后端当前用户的名称
        userName: app.globalData.userName,
      },
      success(res) {
        //得到返回的数据，根据用户的标签进行商品推荐
        this.currentGoods = res.data.currentGoods;
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
      url: '/secondHand_search',
      data: {
        searchValue: searchValue,
      },
      success(res) {
        //得到返回的数据
        this.currentGoods = res.data.currentGoods;
        console.log(res.data)
      }
    });
    console.log('form发生了submit事件，携带数据为：', searchValue)
  },

  gotoDetail:function (e) {
    app.globalData.currentDetailGood = e.currentTarget.dataset.good_name;
    console.log(app.globalData.currentDetailGood);
    wx.navigateTo({
      url: 'goodDetail/goodDetail',
    })
  }
})