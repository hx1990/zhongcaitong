const log=console.log.bind(console)
const app = getApp()
let host = app.globalData.host
let cabinetNo=app.globalData.cabinetNo

Page({
  data: {
    price:10,
    total:10,
    stepper: {
      stepper: 1,
      min: 1,
      max: 10,
      size: 'large',
    },
    text: '当前未联机，请扫码连接机柜',
    userId:0,
    connect:false,
    speed:70,
    img:'../../img/banner.png',
    cabinetNum:''
  },
  onLoad(options){
    
    let that=this
    wx.request({
      url: `${host}/api/goods/index`,
      success(res){
       if(res.data.code==200){
         log(res)
         that.setData({
           price: res.data.data.price,
           img: res.data.data.img 
         })
       }
      }
    })
  },
  onShow(){
    let that = this
    cabinetNo=getApp().globalData.cabinetNo
    
    
    log('show', cabinetNo)
    if (cabinetNo == 0) {
      this.setData({
        text: '当前未联机，请扫码连接机柜',
        connect: false,
      })
      log('show1未连接')
    }

    wx.getStorage({
      key: 'connect',
      success(res){
        log('show2',res)
        getApp().globalData.cabinetNo = res.data.cabinetNum
       that.setData({
         text: `当前连接机柜编号为:${res.data.cabinetNum}，机柜剩余彩票数量为:${res.data.lotteryNum}张`,
         connect: true,
         lotteryNum: res.data.lotteryNum,
         cabinetNum: res.data.cabinetNum
       })
      },
      fail(err){
        log('show3',err)
      }
    })
    
     
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.setData({
          userId: res.data.userId
        },function(){
          that.connectCabinet(cabinetNo)
        })
      },
      fail(){
        wx.login({
          success: function (e) {
            wx.request({
              url: `${host}/wx/login`,
              data: {
                code: e.code
              },
              success(res) {
                that.setData({
                  userId: res.data.data.id,
                }, function () {
                  that.connectCabinet(cabinetNo)
                })
                wx.setStorage({
                  key: 'userInfo',
                  data: {
                    userId: res.data.data.id,
                  },
                })
              }
            })
          }
        })
      }
    })
    
    
  },
  connectCabinet(cabinetNo){
    let that = this
    // cabinetNo = getApp().globalData.cabinetNo
    log('机柜号',cabinetNo)
    if (cabinetNo) {
      wx.request({
        url: `${host}/api/user/connect/cabinet`,
        data: {
          userId: that.data.userId,
          cabinetNum: cabinetNo
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success(res) {

          if (res.data.code == 200) {
            that.setData({
              lotteryNum: res.data.data.lotteryNum,
              connect: true,
              text: `当前连接机柜编号为:${cabinetNo}，机柜剩余彩票数量为:${res.data.data.lotteryNum}张`,
            })
            wx.setStorage({
              key: 'connect',
              data: {
                connect: true,
                lotteryNum: res.data.data.lotteryNum,
                cabinetNum: cabinetNo,
              },
            })
            return true
          }else{
            wx.showModal({
              title: '提示',
              content: res.data.message,
            })
          }
        }
      })
    }
  },
 

  saoma(){
      let that = this
      app.globalData.saoma = true
      if (this.data.connect){
        return false
      }
      wx.scanCode({
        success: (res) => {
          log('扫码成功')
          let temp = res.path.split('?')
          let id = temp[1].split('=')[1]
          log('id',id)
          getApp().globalData.cabinetNo=id
          that.onShow()
          that.connectCabinet(id)
          if (that.data.lotteryNum){
            wx.showModal({
              title: '提示',
              content: `联机成功，当前联机ID为：${cabinetNo},剩余票量为：${that.data.lotteryNum}张`,
            })
          }
        },
      })
    
  },
 
  
  handleZanStepperChange({detail: stepper}) {
    this.setData({
      'stepper.stepper': stepper,
      total: this.data.price * stepper
    });
  },


 
 
  onGotUserInfo(e) {
    let that=this
    wx.request({
      url: `${host}/wx/update/user/info`,
      data: {
        userId: that.data.userId,
        nickName: e.detail.userInfo.nickName,
        face: e.detail.userInfo.avatarUrl,
        gender: e.detail.userInfo.gender
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
      },
      success(res) {
        log('userinfo',res)
      },
    })

    if (this.data.connect){
      wx.showModal({
        title: '提示',
        content: `当前购买张数:${that.data.stepper.stepper}张,应支付金额为：￥${that.data.total}元`,
        confirmText: '确认支付',
        cancelText: '取消支付',
        success: function (res) {
          if (res.confirm) {
            if (that.data.lotteryNum >= that.data.stepper.stepper) {
              wx.request({
                url: `${host}/api/pay/wx/mini`,
                data: {
                  userId: that.data.userId,
                  goodsId: 1,
                  bugNum: that.data.stepper.stepper,
                  cabinetNo
                },
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded', 
                },
                success(res) {
                  if (res.data.code == 200) {
                    let p = res.data.data
                    wx.requestPayment({
                      'timeStamp': p.timeStamp,
                      'nonceStr': p.nonceStr,
                      'package': p.package,
                      'signType': p.signType,
                      'paySign': p.paySign,
                      'success': function (res) {
                        wx.showLoading({
                          title: '出票中....',
                        })
                        wx.request({
                          url: `${host}/api/hard/ware/out/lottery`,
                          data: {
                            orderNo: p.orderNo
                          },
                          method: 'POST',
                          header: {
                            'content-type': 'application/x-www-form-urlencoded'
                          },
                          success(res) {
                           
                            if(res.data.code==200){
                              wx.hideLoading()
                              wx.showToast({
                                title: '出票成功',
                                icon: 'success',
                                duration: 2000
                              })
                          }else{
                            wx.hideLoading()
                              wx.showModal({
                              title: '提示',
                              content: res.data.message,
                            })
                          }
                          }
                        })
                       },
                      'fail': function (res) {
                        log('失败', res)
                      }
                    })
                  } else if (res.data.code == 500) {

                    wx.showModal({
                      title: '提示',
                      content: res.data.message,
                      duration: 10,
                      confirmText: '重新选购',
                      cancelText: '返回'
                    })
                  }
                },
              })
            } else {
              wx.showModal({
                title: '提示',
                content: `当前机柜彩票数:${that.data.lotteryNum}张,购买数量不能超过机柜票量`,
              })
            } 
          }
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请扫描机柜二维码联机后方可支付。',
        complete() {
          //调用扫描
          app.globalData.saoma = true
          wx.scanCode({
            success: (e) => {
              let temp = e.path.split('?')
              let id = temp[1].split('=')[1]
              //连接机柜
              log('联机1')
              getApp().globalData.cabinetNo = id
              that.onShow()
              
              wx.request({
                url: `${host}/api/user/connect/cabinet`,
                data: {
                  userId: that.data.userId,
                  cabinetNum: id,
                },
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                },
                success(res) {
                  log('联机2', res,id)
                  if (res.data.code == 200) {
                   that.setData({
                    text: `当前连接机柜编号为:${id}，机柜剩余彩票数量为:${res.data.data.lotteryNum}张`,
                    connect: true,
                   })
                   
                    wx.setStorage({
                      key: 'connect',
                      data: {
                        connect: true,
                        lotteryNum: res.data.data.lotteryNum,
                        cabinetNum: id
                      },
                    })
                    
                    wx.showModal({
                      title: '提示',
                      content: `当前购买张数:${that.data.stepper.stepper}张,应支付金额为：￥${that.data.total}元`,
                      duration: 10,
                      confirmText: '确认支付',
                      cancelText: '取消支付',
                      success: function (e) {
                        log('联机3',e)
                        if (e.confirm) {
                          
                          if (res.data.data.lotteryNum >= that.data.stepper.stepper) {
                            //调用后台接口获取微信支付接口参数
                            log('联机5','sdfgh' )
                            wx.request({
                              url: `${host}/api/pay/wx/mini`,
                              data: {
                                userId: that.data.userId,
                                goodsId: 1,
                                bugNum: that.data.stepper.stepper,
                                cabinetNo: id
                              },
                              method: 'POST',
                              header: {
                                'content-type': 'application/x-www-form-urlencoded', // 默认值
                              },
                              success(res) {
                                log('联机4', res)
                                if (res.data.code == 200) {
                                  let p = res.data.data
                                  //调用微信支付接口
                                  app.globalData.saoma = true
                                  wx.requestPayment({
                                    'timeStamp': p.timeStamp,
                                    'nonceStr': p.nonceStr,
                                    'package': p.package,
                                    'signType': p.signType,
                                    'paySign': p.paySign,
                                    'success': function (res) {
                                      wx.showLoading({
                                        title: '出票中....',
                                      })
                                      //出票接口

                                      wx.request({
                                        url: `${host}/api/hard/ware/out/lottery`,
                                        data: {
                                          orderNo: p.orderNo
                                        },
                                        method: 'POST',
                                        header: {
                                          'content-type': 'application/x-www-form-urlencoded'
                                        },
                                        success(res) {
                                          log('出票成功', res)
                                          if(res.data.code==200){
                                            wx.hideLoading()
                                            wx.showToast({
                                              title: '出票成功',
                                              icon: 'success',
                                            })
                                          }else{
                                            wx.hideLoading()
                                            wx.showModal({
                                              title: '提示',
                                              content: res.data.message,
                                            })
                                          }
                                        }
                                      })
                                    },
                                    'fail': function (res) {
                                      log('失败', res)
                                    }
                                  })
                                } else if (res.data.code == 500) {

                                  wx.showModal({
                                    title: '提示',
                                    content: res.data.message,
                                    duration: 10,
                                    confirmText: '重新选购',
                                    cancelText: '返回'
                                  })
                                }
                              },
                              fail(err){
                                log('获取支付数据失败',err)
                              }
                            })
                          } else {
                            wx.showModal({
                              title: '提示',
                              content: `当前机柜彩票数:${res.data.data.lotteryNum}张,购买数量不能超过机柜票量`,
                              duration: 10,
                              confirmText: '重新选择',
                              cancelText: '返回',
                            })
                          }

                        }else{
                          log('联机6','用户取消')
                        }
                      }
                    })
                  }
                }
              })
            }
          })
        }
      })
    }
  },
})
