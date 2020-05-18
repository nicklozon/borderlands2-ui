import { ContextActionTypes, ContextState, DESELECT_WEAPON, TOGGLE_WEAPON } from "./types";

const initialState: ContextState = {
  selectedWeaponIds: []
}

export function contextReducer(state = initialState, action: ContextActionTypes): ContextState {
  switch(action.type) {
    case TOGGLE_WEAPON:
      if(state.selectedWeaponIds.includes(action.weaponId)) {
        return { selectedWeaponIds: state.selectedWeaponIds.filter(id => id !== action.weaponId) }
      } else {
        return { selectedWeaponIds: [...state.selectedWeaponIds, action.weaponId] }
      }
    case DESELECT_WEAPON:
      return  { selectedWeaponIds: state.selectedWeaponIds.filter(id => id !== action.weaponId) }
    default:
      return state
  }
}