import { GlobalActionTypes, GlobalState, GlobalTypes } from './utils'

export const globalReducer = (
  state: GlobalState,
  action: GlobalActionTypes
): GlobalState => {
  const { type } = action

  switch (type) {
    case GlobalTypes.SET_USER_INFO_MODAL:
      return {
        ...state,
        userInfoModal: action.payload.state,
      }

    case GlobalTypes.SET_SIGN_IN_MODAL:
      return {
        ...state,
        signInModal: action.payload.state,
      }

    case GlobalTypes.SET_USER:
      return {
        ...state,
        user: action.payload.user,
      }

    case GlobalTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      }

    case GlobalTypes.SET_PROVIDER:
      return {
        ...state,
        library: action.payload.library,
      }

    case GlobalTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      }

    case GlobalTypes.SET_SIDE_MENU:
      return {
        ...state,
        sideMenu: action.payload.state,
      }

    default:
      return state
  }
}
