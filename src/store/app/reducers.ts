import { AppActionTypes, AppState, CLOSE_WEAPON_MODAL, OPEN_WEAPON_MODAL  } from "./types";

const initialState: AppState = {
  weaponModal: false
}

export function appReducer(state = initialState, action: AppActionTypes): AppState {
  switch(action.type) {
    case CLOSE_WEAPON_MODAL:
      return {
        weaponModal: false
      }
    case OPEN_WEAPON_MODAL:
      return {
        weaponModal: true
      }
    default:
      return state
  }
}