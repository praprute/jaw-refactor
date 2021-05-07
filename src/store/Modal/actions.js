import {
    GET_PRODUCT_DETAIL,
    ADD_PRODUCT_DETAIL,
    ADD_SPECIFIC_DETAIL,
    GET_SPECIFIC_DETAIL,
    ADD_TESTRESULT_LASTED,
    GET_TESTRESULT_LASTED,
    ADD_SPECIFIC_BIO_DETAIL,
    GET_SPECIFIC_BIO_DETAIL,
  } from "./actionTypes"

  export const getProductDetail = () => ({
    type: GET_PRODUCT_DETAIL
  })

  export const AddProductDetail = detail => ({
    type: ADD_PRODUCT_DETAIL,
    payload: detail,
  })

  export const AddSpecificDetail = detail => ({
    type: ADD_SPECIFIC_DETAIL,
    payload: detail,
  })

  export const getSpecificDetail = () => ({
    type: GET_SPECIFIC_DETAIL
  })

  export const AddTestResultlasted = detail => ({
    type: ADD_TESTRESULT_LASTED,
    payload: detail,
  })

  export const getTestResultlasted = () => ({
    type: GET_TESTRESULT_LASTED
  })

  export const AddSpecificBioDetail = detail => ({
    type: ADD_SPECIFIC_BIO_DETAIL,
    payload: detail,
  })

  export const getSpecificBioDetail = () => ({
    type: GET_SPECIFIC_BIO_DETAIL
  })