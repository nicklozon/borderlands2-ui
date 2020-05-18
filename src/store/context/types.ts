export const TOGGLE_WEAPON = 'TOGGLE_WEAPON'

export interface ToggleWeaponAction {
  type: typeof TOGGLE_WEAPON,
  weaponId: string
}

// This is related to the library context, but it is solely for tieing redux
// state together
export interface ContextState {
  selectedWeaponIds: string[]
}

export type ContextActionTypes = ToggleWeaponAction