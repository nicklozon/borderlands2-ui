import { WeaponActionTypes, WeaponState, ADD_WEAPON, DELETE_WEAPON, UPDATE_WEAPON } from "./types";

const initialState: WeaponState = {
  weapons: []
}

// TODO: need to use a uniqe ID for update/delete
export function weaponReducer(state = initialState, action: WeaponActionTypes): WeaponState {
  switch(action.type) {
    case ADD_WEAPON:
      return {
        weapons: [...state.weapons, action.weapon]
      }
    case UPDATE_WEAPON:
      return {
        weapons: [...state.weapons.filter(weapon => weapon.name !== action.weapon.name), action.weapon]
      }
    case DELETE_WEAPON:
      return {
        weapons: state.weapons.filter(weapon => weapon.name !== action.weaponName)
      }
    default:
      return state
  }
}