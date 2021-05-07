import {
    ADD_FG,
    GET_FG
  } from "./actionTypes"

  export const addFG = detail => ({
    type: ADD_FG,
    payload: detail,
  })

  export const getFG = () => ({
    type: GET_FG,
  })