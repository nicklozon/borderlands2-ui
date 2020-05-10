import { CLOSE_WEAPON_MODAL, OPEN_WEAPON_MODAL, AppActionTypes } from './types'

export function closeWeaponModal(): AppActionTypes {
  return {
    type: CLOSE_WEAPON_MODAL
  }
}

export function openWeaponModal(): AppActionTypes {
  return {
    type: OPEN_WEAPON_MODAL
  }
}