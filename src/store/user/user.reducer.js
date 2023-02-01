import { USER_ACTION_TYPES } from "./user.types"

const INITIAL_STATE = {
  currentUser: null,
  idLoading: false,
  error: null
}

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state, currentUser: payload
      }
    case USER_ACTION_TYPES.SIGN_OUT_SSUCCESS:
      return {
        ...state, currentUser: null
      }
    case USER_ACTION_TYPES.SIGN_UP_FAILED:
    case USER_ACTION_TYPES.SIGN_OUT_FAILD:
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
      return {
        ...state, error: payload
      }
    default:
      return state
  }
}
