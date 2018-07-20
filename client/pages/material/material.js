const app=getApp()
const log=console.log.bind(console)
Page({
  data: {
   index:0,
   array:['100*150','200*150'],
   cabinetNum:'',
   lotteryNum:0,
   total:0,
   num:0
  },
  onLoad(){
    let that=this
    wx.getStorage({
      key: 'roleId',
      success(res) {
        that.setData({
          deliverId:res.data.deliverId
        })
      },
    })
    wx.getStorage({
      key: 'userInfo',
      success(e) {
        wx.showModal({
          title: '提示',
          content: `请扫描机柜二维码，进入添加物料页面`,
          duration: 10,
          confirmText: '确认',
          cancelText: '返回',
          success(res) {
            if (res.confirm) {
              app.globalData.saoma = true
              wx.scanCode({
                success: (res) => {
                  that.setData({
                    userId: e.data.userId
                  })
                  let temp = res.path.split('?')
                  let id = temp[1].split('=')[1]
                  wx.request({
                    url: `${host}/api/user/connect/cabinet`,
                    data: {
                      userId: e.data.userId,
                      cabinetNum: id,
                    },
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded',
                    },
                    success(res) {
                      if (res.data.code == 200) {
                        log('获取成功')
                        that.setData({
                          lotteryNum: res.data.data.lotteryNum,
                          cabinetNum: id,
                        })

                        wx.setStorage({
                          key: 'connect',
                          data: {
                            connect: true,
                            lotteryNum: res.data.data.lotteryNum,
                            cabinetNum: id
                          },
                        })
                      }
                    }
                  })
                }
              })
            }else{
              wx.redirectTo({
                url: '/pages/my/my',
              })
            }
          }
        })
      },
    })
  },
  onShow(){
    let that=this
    wx.getStorage({
      key: 'connect',
      success(res) {
        log('获取数据成功',res)
        that.setData({
          connect:true,
          lotteryNum: res.data.lotteryNum,
          cabinetNum: res.data.cabinetNum
        },()=>{
          log(that.data.lotteryNum,that.data.cabinetNum)
        })
      },
      fail(res){
        log('获取数据失败',res)
      }
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  addPaper(e){
    let that=this
    this.setData({
      num:Number(e.detail.value),
      total:Number(e.detail.value)+this.data.lotteryNum
    })
   
  },
  submit(){
    
    let that=this
   
    if (that.data.num<=0){
      wx.showModal({
        title: '提示',
        content: `添加彩票张数不能小于一张，请重新添加`,
        duration: 10,
        confirmText: '确认',
        cancelText: '返回',
      })
    }else{
      wx.request({
        url: app.globalData.host + '/api/deliver/add/lottery',
        data: {
          deliverId: that.data.deliverId,
          cabinetNo: that.data.cabinetNum,
          num: that.data.num,
          goodsId: 1,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success(res) {
          if (res.data.code == 200) {
            that.setData({
              lotteryNum: that.data.total,
              total: 0,
              num: 0
            })
          }
        }
      })
    }
    

  }
})