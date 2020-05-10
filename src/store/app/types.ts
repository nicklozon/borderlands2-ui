export const CLOSE_WEAPON_MODAL = 'CLOSE_WEAPON_MODAL'
export const OPEN_WEAPON_MODAL = 'OPEN_WEAPON_MODAL'

export interface CloseWeaponModal {
  type: typeof CLOSE_WEAPON_MODAL
}

export interface OpenWeaponModal {
  type: typeof OPEN_WEAPON_MODAL
}

export interface AppState {
  weaponModal: boolean
}

export type AppActionTypes = CloseWeaponModal | OpenWeaponModal