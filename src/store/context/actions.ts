import { TOGGLE_WEAPON, ContextActionTypes, DESELECT_WEAPON } from './types'

export function toggleWeapon(weaponId: string): ContextActionTypes {
  return {
    type: TOGGLE_WEAPON,
    weaponId
  }
}

export function deselectWeapon(weaponId: string): ContextActionTypes {
  return {
    type: DESELECT_WEAPON,
    weaponId
  }
}