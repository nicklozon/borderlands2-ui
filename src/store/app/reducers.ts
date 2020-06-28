import { AppActionTypes, AppState, CLOSE_WEAPON_MODAL, OPEN_WEAPON_MODAL, CLOSE_GEAR_MODAL, OPEN_GEAR_MODAL  } from "./types";

const initialState: AppState = {
  weaponModal: false,
  gearModal: false
}

export function appReducer(state = initialState, action: AppActionTypes): AppState {
  switch(action.type) {
    case CLOSE_WEAPON_MODAL:
      return {
        ...state,
        weaponModal: false
      }
    case OPEN_WEAPON_MODAL:
      return {
        ...state,
        weaponModal: true
      }
    case CLOSE_GEAR_MODAL:
      return {
        ...state,
        gearModal: false
      }
    case OPEN_GEAR_MODAL:
      return {
        ...state,
        gearModal: true
      }
    default:
      return state
  }
}