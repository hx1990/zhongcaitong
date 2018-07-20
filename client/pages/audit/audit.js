// pages/audit/audit.js
Page({

  /**
   * 页面的初始数据
   */
  
    data: {
      inow: 1,
      date: '2018-06-21',
      auditList:[
        { ID: 1, role:'网点',date:'2018-6-25',name:'黄星',phone:13888888888,area:'杭州市余杭区'},
        { ID: 1, role: '网点', date: '2018-6-25', name: '黄星', phone: 13888888888, area: '杭州市余杭区' }
      ]
    },
    change(e) {
      this.setData({
        inow: Number(e.target.dataset.value)
      })
    },
    bindDateChange: function (e) {
      this.setData({
        date: e.detail.value
      })
    },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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