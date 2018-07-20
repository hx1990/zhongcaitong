// pages/applycompany/applycompany.js
import cityList from '../../utils/util.js'
const log=console.log.bind(console)
let cityarr=[]
cityList.forEach((key)=>{
  cityarr.push(key.name)
})
let app=getApp()
let host = app.globalData.host
Page({
  data: {
    zpic: '../../img/zpic.png',
    fpic: '../../img/fpic.png',
    license: '../../img/license.png',
    bankCardPic:'../../img/bank.png',
    Zbchange:false,
    Fbchange:false,
    Lbshange:false,
    bkchange:false,
    array:cityList,
    index:0,
    cityarr:cityarr,
    areaIndex:0,
    city:'杭州',
    area:'拱墅区',
    detail:'',
    company:'',
    name:'',
    phone:0,
    idcard:0,
    userId:0,
    selectCity: '杭州市',
    selectArea: '拱墅区',
    selectIndex: 0,
    selectAreaIndex: 0,
    bankCard:''
  },
  addDetail(e){
    this.setData({
      detail: e.detail.value
    })
  },
  addCompany(e){
    
    this.setData({
      company: e.detail.value
    })
    log(this.data.company)
  },
  addName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  addPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  addIdcard(e){
    this.setData({
      idcard: e.detail.value
    })
  },
  addBankCard(e){
    this.setData({
      bankCard: e.detail.value
    })
  },
  bindCityChange(e){
    this.setData({
      index: Number(e.detail.value),
      city: this.data.array[e.detail.value].name,
      area: this.data.array[e.detail.value].area[0]
    })
    
  },
  bindAreaChange(e) {
    this.setData({
      areaIndex: Number(e.detail.value),
      area:this.data.array[this.data.index].area[e.detail.value]
    })
  },
  hideloading(){
    wx.hideLoading()
  },
  areaCityChange(e) {
    this.setData({
      selectIndex: Number(e.detail.value),
      selectCity: this.data.array[e.detail.value].name,
      selectArea: this.data.array[e.detail.value].area[0]
    })
  },
  areaAreaChange(e) {
    this.setData({
      selectAreaIndex: Number(e.detail.value),
      selectArea: this.data.array[this.data.selectIndex].area[e.detail.value]
    })
  },
  uploadzIdcard(){
    let that=this
    wx.chooseImage({
      success: function (e) {
        var tempFilePaths = e.tempFilePaths
        wx.showLoading({
          title: '图片上传中..',
        })
        wx.uploadFile({
          url: `${host}/upload/picture`,
          filePath: tempFilePaths[0],
          name: 'file',
          success(res){
            log('上传图片',res)
            let json=JSON.parse(res.data)
            that.setData({
              zpic: json.data,
              Zbchange: true
            })
            wx.hideLoading()
          },
          fail(err){
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: err.errMsg,
            })
          }
        })
      }
    })
  },
  uploadfIdcard(){
    let that = this
    wx.chooseImage({
      success: function (e) {
        var tempFilePaths = e.tempFilePaths
        wx.showLoading({
          title: '图片上传中..',
        })
        wx.uploadFile({
          url: `${host}/upload/picture`,
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            let json = JSON.parse(res.data)
            log(json.data)
            that.setData({
              fpic: json.data,
              Fbchange: true
            })
          },
          fail(err) {
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: err.errMsg,
            })
          }
        })
        
      }
    })
  },
  uploadLicense() {
    let that = this
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.showLoading({
          title: '图片上传中..',
        })
        wx.uploadFile({
          url: `${host}/upload/picture`,
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            let json = JSON.parse(res.data)
            that.setData({
              license: json.data,
              Lbchange: true
            })
          },
          fail(err) {
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: err.errMsg,
            })
          }
        })
      }
    })
  },
  uploadBankUp() {
    let that = this
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.showLoading({
          title: '图片上传中..',
        })
        wx.uploadFile({
          url: `${host}/upload/picture`,
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            let json = JSON.parse(res.data)
            that.setData({
               bankCardPic: json.data,
              bkchange: true
            })
          },
          fail(err) {
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: err.errMsg,
            })
          }
        })
      }
    })
  },
  onLoad(){
   let that=this
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        log(res.data.userId)
        that.setData({
          userId: res.data.userId
        })
      }
    })
  },

 submit(){
  if(this.data.detail==''){
    wx.showModal({
      title: '提示',
      content: '详细地址不能为空，请重新输入！',
    })
  }else if (this.data.name == '') {
    wx.showModal({
      title: '提示',
      content: '姓名不能为空，请重新输入！',
    })
  }else if (this.data.phone == 0) {
    wx.showModal({
      title: '提示',
      content: '手机号不能为空，请重新输入！',
    })
  } else if (this.data.phone.length <11) {
    wx.showModal({
      title: '提示',
      content: '手机号有误，请重新输入！',
    })
  } else if (this.data.idcard == 0) {
    wx.showModal({
      title: '提示',
      content: '身份证号不能为空，请重新输入！',
    })
  } else if (this.data.idcard.length<18) {
    wx.showModal({
      title: '提示',
      content: '身份证号有误，请重新输入！',
    })
  } else if (!this.data.Zbchange) {
    wx.showModal({
      title: '提示',
      content: '身份证照片正面不能为空，请上传身份证正面图片！',
    })
  } else if (!this.data.Fbchange) {
    wx.showModal({
      title: '提示',
      content: '身份证照片反面不能为空，请上传身份证反面图片！',
    })
  }else{
    let that=this
    let detailAddress =`浙江省${this.data.city}${this.data.area}${this.data.detail}`
    let applyArea = `${this.data.selectCity}市${this.data.selectArea}`
    wx.request({
      url: `${host}/api/partner/apply`,
      data: {
        userId:that.data.userId,
        name: that.data.name,
        phone:that.data.phone,
        address:detailAddress,
        idCardNum: that.data.idcard,
        idCardUp:that.data.zpic,
        idCardDown:that.data.fpic,
        businessLicense: that.data.Lbshange?that.data.license:'',
        applyArea,
        bankCard:that.data.bankCard,
        bankCardUp: that.data.bkchange?that.data.bankCardPic:''
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
      },
      success(res) {
        if(res.data.code==200){
          wx.redirectTo({
            url: '/pages/applyIng/applyIng',
          })
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
  onShow: function () {
     log(host)
  },
  onUnload: function () {
  },
  onShareAppMessage: function () {
  
  }
})