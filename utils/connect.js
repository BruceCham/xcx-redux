import shallowEqual from './shallowEqual'
let __Store = getApp().Store
let mapStateToData
let baseObj = {
  __observer: null,
  onLoad() {},
  onUnload() {},
  onShow() {},
  onHide() {}
}
let config = {
  __Store,
  __dispatch: __Store.dispatch,
  __observer() {
    if (super.__observer) {
      super.__observer()
      return
    }
    const state = __Store.getState()
    const newData = mapStateToData(state)
    const oldData = mapStateToData(this.data || {})
    if (shallowEqual( oldData , newData)) {
      return
    }
    console.log(" Test setData ")
    this.setData(newData)
  },
  __destroy: null,
  onLoad() {
    super.onLoad()
    this.__destroy = this.__Store.subscribe(this.__observer)
    this.__observer()
  },
  onUnload() {
    super.onUnload()
    this.__destroy && this.__destroy() & delete this.__destroy
  },
  onShow() {
    if (!this.__destroy) {
      this.__destroy = this.__Store.subscribe(this.__observer)
      this.__observer()
    }
    super.onShow()
  },
  onHide() {
    super.onHide()
    this.__destroy && this.__destroy() & delete this.__destroy
  }
}

export default (mapState = ()=> {}) => {
  mapStateToData = mapState
  return (options = {}) => {
    let opts = Object.assign({}, baseObj, options)
    Object.setPrototypeOf(config, opts)
    return config
  }
}
