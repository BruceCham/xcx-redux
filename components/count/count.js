const app = getApp()
const Store = app.Store
const dispatch = Store.dispatch
Component({
  properties: {
    count: {
      type: Number,
      value: 0,
      observer: (oldVal, newVal)=>{
        console.log("components update")
      }
    },
    myTestFn:{
      type: Function,
      value: ()=>{}
    }
  },
  data: {},
  methods: {
    changeCountToZero(e){
      dispatch({
        type: "COUNTER_CLEAR"
      })
    }
  },
  created(){
    console.log("created")
  },
  attached() {
    console.log("attached")
  },
  ready() {
    console.log("ready")
  },
  moved() {
    console.log("moved")
  },
  detached() {
    console.log("detached")
  }
})
