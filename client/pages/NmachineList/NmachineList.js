const app = getApp()
const host = app.globalData.host
const log = console.log.bind(console)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
   log('执行')
    let that = this
    wx.getStorage({
      key: 'roleId',
      success(e) {
        log('adsds', e.data.networkId)
        wx.request({
          
          url: host + '/api/cabinet/list/by/network',
          data: {
            networkId: e.data.networkId
          },
          method: 'GET',
          success(res) {
            if (res.data.code == 200) {
              log('dfsakjfhdahda',res)
              that.setData({
                data: res.data.data
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