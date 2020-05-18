import { Weapon } from 'borderlands2'

export const ADD_WEAPON = 'ADD_WEAPON'
export const UPDATE_WEAPON = 'UPDATE_WEAPON'
export const DELETE_WEAPON = 'DELETE_WEAPON'

export interface AddWeaponAction {
  type: typeof ADD_WEAPON,
  weapon: Weapon
}

export interface UpdateWeaponAction {
  type: typeof UPDATE_WEAPON,
  weapon: Weapon
}

export interface DeleteWeaponAction {
  type: typeof DELETE_WEAPON,
  weaponId: string
} 

export interface WeaponState {
  weapons: Weapon[]
}

export type WeaponActionTypes = AddWeaponAction | UpdateWeaponAction | DeleteWeaponAction