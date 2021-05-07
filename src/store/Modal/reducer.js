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
    GET_FG
  } from "./actionTypes"

const INIT_STATE = {
   Detail:{},
   SpecificChem:{},
   TestResultLasted:{},
   SpecificBio:{},
  }

const DetailOrder = (state = INIT_STATE, action) => {
    switch (action.type){
        case GET_PRODUCT_DETAIL:
            return state

        case ADD_PRODUCT_DETAIL:
            return {
                    ...state,
                    Detail: action.payload,
            }
        
        case ADD_SPECIFIC_DETAIL:
            // console.log('spc : ', action.payload)
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
            // console.log('ADD_SPECIFIC_BIO_DETAIL: ',action.payload)
                return {
                        ...state,
                        SpecificBio: action.payload,
                    }
    
        case GET_SPECIFIC_BIO_DETAIL:
                    return state
        
            default:
                // console.log('test defual fredux')
                return state
        

    }
}

export default DetailOrder