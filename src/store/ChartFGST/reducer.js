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
                        return {
                            ...state,
                            DFG: action.payload,
                        }
            
            case GET_FG:
                        return state 
                default:
                    return state
        }
   }

   export default DFGST