# 应用 Redux 实现小程序组件化通信 

从小程序基础库版本 1.6.3 开始，小程序支持简洁的组件化编程。

在小程序组件化的基础上，利用 Redux来实现组件通信，实现思路：观察者模式 + 装饰者模式。 

<br/>

入口文件 `app.js`： 

```js
import Store from './reducers/index'
App({
  Store,
  ...
})
``` 

<br/>

需要添加通信的视图文件 `/pages/index/index.js`：

```js
import connect from "../../utils/connect"
const mapStateToProps = (state) => {
  return {
    counter: state.counter
  }
}
Page(
  connect(mapStateToProps)({
    data: {
      innerText: "olleH 点我加1哦"
    },
    bindBtn() {
      this.__dispatch({
        type: "COUNTER_ADD_1"
      })
    }
  })
)
``` 

**注意：** `this` 对象中，已经内置 `__Store`、`__dispatch`、`__destroy`、`__observer`。 

* `__Store`         状态管理中心
* `__dispatch`      `dispatch` 触发 `reducer`
* `__destroy`       毁灭者，取消观察
* `__observer`      观察者，`state` 变化时候回调

<br/>

不需要 `state`，但需要用到 `dispatch`的视图中，可以直接通过实例app或引入reducers方式获取

```js
import Store from '../../reducers/index'
const dispatch = Store.dispatch

const {Store} = getApp()
const dispatch = Store.dispatch
```
