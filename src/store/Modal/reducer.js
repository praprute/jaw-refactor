import {
  GET_PRODUCT_DETAIL,
  ADD_PRODUCT_DETAIL,
  ADD_SPECIFIC_DETAIL,
  GET_SPECIFIC_DETAIL,
  ADD_TESTRESULT_LASTED,
  GET_TESTRESULT_LASTED,
  ADD_SPECIFIC_BIO_DETAIL,
  GET_SPECIFIC_BIO_DETAIL,
  ADD_FG,
  GET_FG,
  ADD_ORDER_VEIT,
  GET_ORDER_VEIT,
} from "./actionTypes"

const INIT_STATE = {
   Detail:{},
   SpecificChem:{},
   TestResultLasted:{},
   SpecificBio:{},
   veit:[]
  }

const DetailOrder = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_PRODUCT_DETAIL:
        return state

      case ADD_PRODUCT_DETAIL:
        return {
          ...state,
          Detail: action.payload,
        }

      case ADD_SPECIFIC_DETAIL:
        return {
          ...state,
          SpecificChem: action.payload,
        }

      case GET_SPECIFIC_DETAIL:
        return state

      case ADD_TESTRESULT_LASTED:
        return {
          ...state,
          TestResultLasted: action.payload,
        }

      case GET_TESTRESULT_LASTED:
        return state

      case ADD_SPECIFIC_BIO_DETAIL:
        return {
          ...state,
          SpecificBio: action.payload,
        }

      case GET_SPECIFIC_BIO_DETAIL:
        return state

      case ADD_ORDER_VEIT:
        return {
          ...state,
          veit: action.payload,
        }
        
      case GET_ORDER_VEIT:
        return state

      default:
        return state
    }
}

export default DetailOrder


