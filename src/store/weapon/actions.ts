import { ADD_WEAPON, UPDATE_WEAPON, DELETE_WEAPON, WeaponActionTypes } from './types'
import { Weapon } from 'borderlands2'

export function addWeapon(weapon: Weapon): WeaponActionTypes {
  return {
    type: ADD_WEAPON,
    weapon
  }
}

export function updateWeapon(weapon: Weapon): WeaponActionTypes {
  return {
    type: UPDATE_WEAPON,
    weapon
  }
}

export function removeWeapon(weaponId: string): WeaponActionTypes {
  return {
    type: DELETE_WEAPON,
    weaponId
  }
}