//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    isIphoneX: app.globalData.isIphoneX,
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    visible: false,
    tabBarHidden:app.globalData.tabBarHidden,
    chooseButton: [{
        name: '发布二手商品',
        icon: 'shop_fill',
        color: '#000'
      },
      {
        name: '发布校园讨论',
        icon: 'group_fill',
        color: '#000'
      },
      {
        name: '取消',
        icon: 'close',
        color: '#959595'
      }
    ],
  },

  barChange({detail}) {
    var _current = detail.key;
    switch (_current) {
      case "secondHand": {
        wx.switchTab({
          url: '../secondHand/secondHand',
        })
        break;
      };
      case "schoolTalk": {
        wx.switchTab({
          url: '../schoolTalk/schoolTalk',
        })
        break;
      };
    case "add": {
      this.setData({
        visible: true,
      });
      break;
    };
    case "information": {
      wx.switchTab({
        url: '../information/information',
      })
      break;
    };
    case "mine": {
      wx.switchTab({
        url: '../mine/mine',
      })
      break;
    };
    }
  },

  handleAddClick({detail}){
    switch(detail.index){
      case 0:{
        wx.navigateTo({
          url: '../release/releaseGoods/releaseGoods',
        })
        break;
      };
      case 1:{
        wx.navigateTo({
          url: '../release/releaseTalk/releaseTalk',
        })
        break;
      };
      case 2:{
        this.setData({
          visible: false,
        });
        break;
      };
    }
  },

  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
    
  },

  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})