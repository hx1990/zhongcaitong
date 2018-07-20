// pages/set/set.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  identification(){
    wx.redirectTo({
      url: '/pages/identfication/identfication',
    })
  },
  bankCard(){
    wx.redirectTo({
      url: '/pages/bankCard/bankCard',
    })
  },
  onGotUserInfo(e){
    console.log(e)
  },
  onReady: function () {
  
  },

  
  onHide: function () {
  
  },

  
  onShareAppMessage: function () {
  
  }
})