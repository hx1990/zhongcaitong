const app = getApp()
const host = app.globalData.host
const log = console.log.bind(console)
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(date) {
    let that = this
    
    wx.getStorage({
      key: 'roleId',
      success(e) {
       
        wx.request({
          url: host + '/api/partner/history/profit',
          data: {
            partnerId: e.data.partnerId,
            date:date.date
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded', // 默认值
          },
          success(res) {
            if(res.data.code==200){
              that.setData({
                data: res.data.data,
                date:date.date
              })
            }
            
          }
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})