const app = getApp()
const Store = app.Store
const dispatch = Store.dispatch

Page({
  data: {
    foo: 0
  },
  onLoad() {
    
  },
  dispatchCount(){
    dispatch({
      type: "COUNTER_ADD_1"
    })
  }
})