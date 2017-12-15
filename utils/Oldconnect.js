let __Store = getApp().Store
let baseObj = {
  __observer(){},
  onLoad(){},
  onUnload(){},
  onShow(){},
  onHide(){}
}
let config = {
  __Store,
  __dispatch: __Store.dispatch,
  __observer(){
    super.__observer()
  },
  __destroy: null,
  onLoad(){
    super.onLoad()
    this.__destroy = this.__Store.subscribe(this.__observer)
    this.__observer()
  },
  onUnload() {
    super.onUnload()
    this.__destroy && (this.__destroy() & delete this.__destroy)
  },
  onShow(){
    if(!this.__destroy){
      this.__destroy = this.__Store.subscribe(this.__observer)
      this.__observer()
    }
    super.onShow() 
  },
  onHide(){
    super.onHide()
    this.__destroy && (this.__destroy() & delete this.__destroy)
  }
}

export default (options = {})=>{
  let opts = Object.assign({}, baseObj, options)
  Object.setPrototypeOf( config, opts )
  return config
}

