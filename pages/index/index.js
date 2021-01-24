// index.js
// 获取应用实例
import ImageExample from '../palette/tpl';
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    paintPallette:{},
    posterImgStyle:''
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    const { tpl } = new ImageExample().palette({
    
    });

    const { windowHeight } = wx.getSystemInfoSync();
    // const safeHeight = safeArea.bottom; // 屏幕高度，包含头顶导航，screenheight是可视区高度
    // 海报高度
    // const drawImgHeight = windowHeight - 184 + 12; // 88:navigatorbar, 12:圆角高度, 184: 下方按钮高度
    // const drawImgWidth = (drawImgHeight * 414) / parseInt(bgHeight.replace('px', ''), 10);
    this.setData({
      paintPallette: tpl,
      // bgColor: `background:${color};height:${windowHeight}px;`,
      // posterImgStyle: `width:${drawImgWidth}px;height:${drawImgHeight}px;margin-top:45px;`,
    });
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
