import { Weapon } from 'borderlands2'

export const ADD_WEAPON = 'ADD_WEAPON'
export const DELETE_WEAPON = 'DELETE_WEAPON'

export interface AddWeaponAction {
  type: typeof ADD_WEAPON,
  weapon: Weapon
}

export interface DeleteWeaponAction {
  type: typeof DELETE_WEAPON,
  weaponName: string
} 

export interface WeaponState {
  weapons: Weapon[]
}

export type WeaponActionTypes = AddWeaponAction | DeleteWeaponAction