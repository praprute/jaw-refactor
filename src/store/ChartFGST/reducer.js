import {
    ADD_FG,
    GET_FG
  } from "./actionTypes"

const INIT_STATE = {
    DFG :[]
   }

   const DFGST = (state = INIT_STATE, action) => {
        switch (action.type){
            case ADD_FG:
                // console.log('DFG: action.payload : ', action.payload)
                        return {
                            ...state,
                            DFG: action.payload,
                        }
            
            case GET_FG:
                        return state 
                default:
                    // console.log('test defual fredux')
                    return state
        }
   }

   export default DFGST