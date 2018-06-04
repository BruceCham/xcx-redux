import shallowEqual from './shallowEqual'
let __Store = getApp().Store
export default (mapStateToData = () => {}) => {
  let config = {
    __Store,
    __dispatch: __Store.dispatch,
    __destroy: null,
    __observer() {
      if (super.__observer) {
        super.__observer()
        return
      }
      const state = __Store.getState()
      const newData = mapStateToData(state)
      const oldData = mapStateToData(this.data || {})
      if (shallowEqual(oldData, newData)) {
        return
      }
      this.setData(newData)
    },
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
      super.onShow()
      if (!this.__destroy) {
        this.__destroy = this.__Store.subscribe(this.__observer)
        this.__observer()
      }
    },
    onHide() {
      super.onHide()
      this.__destroy && this.__destroy() & delete this.__destroy
    }
  }
  return (options = {}) => {
    Object.setPrototypeOf(config, {
      __observer: null,
      onLoad() { },
      onUnload() { },
      onShow() { },
      onHide() { },
      ...options
    })
    return config
  }
}