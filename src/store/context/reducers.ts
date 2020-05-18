import { ContextActionTypes, ContextState, TOGGLE_WEAPON } from "./types";

const initialState: ContextState = {
  selectedWeaponIds: []
}

// TODO: need to use a uniqe ID for update/delete
export function contextReducer(state = initialState, action: ContextActionTypes): ContextState {
  switch(action.type) {
    case TOGGLE_WEAPON:
      if(state.selectedWeaponIds.includes(action.weaponId)) {
        return { selectedWeaponIds: state.selectedWeaponIds.filter(id => id !== action.weaponId) }
      } else {
        return { selectedWeaponIds: [...state.selectedWeaponIds, action.weaponId] }
      }
    default:
      return state
  }
}