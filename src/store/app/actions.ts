import { CLOSE_WEAPON_MODAL, OPEN_WEAPON_MODAL, CLOSE_GEAR_MODAL, OPEN_GEAR_MODAL, AppActionTypes } from './types'

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

export function closeGearModal(): AppActionTypes {
  return {
    type: CLOSE_GEAR_MODAL
  }
}

export function openGearModal(): AppActionTypes {
  return {
    type: OPEN_GEAR_MODAL
  }
}