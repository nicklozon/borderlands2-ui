import { TOGGLE_WEAPON, ContextActionTypes } from './types'

export function toggleWeapon(weaponId: string): ContextActionTypes {
  return {
    type: TOGGLE_WEAPON,
    weaponId
  }
}