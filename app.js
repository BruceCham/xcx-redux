//app.js
import "./utils/toPromise"
import Store from './reducers/index'

App({
  Store,
  onLaunch() {
    wx.request({
      url: "http://www.weather.com.cn/data/sk/101010100.html"
    }).then(res=>{
      console.log("come from Promised api, then:",res)
    }).catch(err=>{
      console.log("come from Promised api, catch:",err)
    }).finally((res)=>{
      console.log("come from Promised api, finally:")
    })
  }
})