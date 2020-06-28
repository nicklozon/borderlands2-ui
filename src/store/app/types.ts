export const CLOSE_WEAPON_MODAL = 'CLOSE_WEAPON_MODAL'
export const OPEN_WEAPON_MODAL = 'OPEN_WEAPON_MODAL'
export const CLOSE_GEAR_MODAL = 'CLOSE_GEAR_MODAL'
export const OPEN_GEAR_MODAL = 'OPEN_GEAR_MODAL'

export interface CloseWeaponModal {
  type: typeof CLOSE_WEAPON_MODAL
}

export interface OpenWeaponModal {
  type: typeof OPEN_WEAPON_MODAL
}

export interface CloseGearModal {
  type: typeof CLOSE_GEAR_MODAL
}

export interface OpenGearModal {
  type: typeof OPEN_GEAR_MODAL
}

export interface AppState {
  weaponModal: boolean,
  gearModal: boolean
}

export type AppActionTypes = CloseWeaponModal | OpenWeaponModal | CloseGearModal | OpenGearModal