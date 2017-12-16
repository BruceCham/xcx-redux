import connect from "../../utils/connect"
const mapStateToProps = (state) => {
  return {
    counter: state.counter
  }
}
Page(connect(mapStateToProps)({
  data: {
    innerText: "Hello 点我加1哦"
  },
  bindBtn() {
    this.__dispatch({
      type: "COUNTER_ADD_1"
    })
  },
  redirectToLog() {
    wx.navigateTo({
      url: "../logs/logs"
    })
    // wx.redirectTo({
    //   url: "../logs/logs"
    // })
  },
  onLoad() {
    console.log("index onload")
  },
  onUnload(){
    console.log("index page is unload")
  },
  onShow(){
    console.log("index page is show")
  },
  onHide(){
    console.log("index page is hide")
  }
}))
