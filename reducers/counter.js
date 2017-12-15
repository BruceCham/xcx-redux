const INITIAL_STATE = {
  count: 0,
  rest: 0
}
const Counter = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "COUNTER_ADD_1": {
      let { count } = state
      return Object.assign({}, state, { count: count + 1 })
    }
    case "COUNTER_CLEAR": {
      let { rest } = state
      return Object.assign({}, state, { count: 0, rest: rest+1 })
    }
    default: {
      return state
    }
  }
}
export default Counter
