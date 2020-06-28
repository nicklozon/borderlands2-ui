import { WeaponActionTypes, WeaponState, ADD_WEAPON, DELETE_WEAPON, UPDATE_WEAPON } from "./types";

const initialState: WeaponState = {
  weapons: []
}

export function weaponReducer(state = initialState, action: WeaponActionTypes): WeaponState {
  switch(action.type) {
    case ADD_WEAPON:
      return {
        weapons: [...state.weapons, action.weapon]
      }
    case UPDATE_WEAPON:
      return {
        weapons: state.weapons.map(weapon => {
          return weapon.id === action.weapon.id ? action.weapon : weapon
        })
      }
    case DELETE_WEAPON:
      return {
        weapons: state.weapons.filter(weapon => weapon.id !== action.weaponId)
      }
    default:
      return state
  }
}