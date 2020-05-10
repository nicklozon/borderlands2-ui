import { WeaponActionTypes, WeaponState, ADD_WEAPON, DELETE_WEAPON } from "./types";

const initialState: WeaponState = {
  weapons: []
}

export function weaponReducer(state = initialState, action: WeaponActionTypes): WeaponState {
  switch(action.type) {
    case ADD_WEAPON:
      let weapons = [...state.weapons, action.weapon]
      return {
        weapons
      }
    case DELETE_WEAPON:
      return {
        weapons: state.weapons.filter(weapon => weapon.name !== action.weaponName)
      }
    default:
      return state
  }
}