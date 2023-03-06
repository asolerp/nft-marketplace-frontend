import { GlobalHooks, setupHooks } from '@hooks/auth/setupHooks'

export type GlobalState = {
  user: any
  token: string | null
  signInModal: boolean
  userInfoModal: boolean
  sideMenu: boolean
  library: any
  hooks: GlobalHooks
}

export enum GlobalTypes {
  SET_SIGN_IN_MODAL = 'SET_SIGN_IN_MODAL',
  SET_USER_INFO_MODAL = 'SET_USER_INFO_MODAL',
  SET_SIDE_MENU = 'SET_SIDE_MENU',
  SET_USER = 'SET_USER',
  SET_TOKEN = 'SET_TOKEN',
  SET_PROVIDER = 'SET_PROVIDER',
}

type SetSignInModal = {
  type: typeof GlobalTypes.SET_SIGN_IN_MODAL
  payload: any
}

type SetSideMenu = {
  type: typeof GlobalTypes.SET_SIDE_MENU
  payload: any
}

type SetToken = {
  type: typeof GlobalTypes.SET_TOKEN
  payload: any
}

type SetProvider = {
  type: typeof GlobalTypes.SET_PROVIDER
  payload: any
}

type SetUserInfoModal = {
  type: typeof GlobalTypes.SET_USER_INFO_MODAL
  payload: any
}

type SetUser = {
  type: typeof GlobalTypes.SET_USER
  payload: any
}

export type GlobalActionTypes =
  | SetToken
  | SetUser
  | SetSignInModal
  | SetUserInfoModal
  | SetSideMenu
  | SetProvider

export const initialState: GlobalState = {
  user: null,
  token: null,
  signInModal: false,
  userInfoModal: false,
  library: null,
  sideMenu: false,
  hooks: setupHooks(),
}
