import { ADD_WEAPON, DELETE_WEAPON, WeaponActionTypes } from './types'
import { Weapon } from 'borderlands2'

export function addWeapon(weapon: Weapon): WeaponActionTypes {
  return {
    type: ADD_WEAPON,
    weapon
  }
}

export function removeWeapon(weaponName: string): WeaponActionTypes {
  return {
    type: DELETE_WEAPON,
    weaponName
  }
}