import { Gear } from 'borderlands2'

export const ADD_GEAR = 'ADD_GEAR'
export const UPDATE_GEAR = 'UPDATE_GEAR'
export const DELETE_GEAR = 'DELETE_GEAR'

export interface AddGearAction {
  type: typeof ADD_GEAR,
  gearItem: Gear
}

export interface UpdateGearAction {
  type: typeof UPDATE_GEAR,
  gearItem: Gear
}

export interface DeleteGearAction {
  type: typeof DELETE_GEAR,
  gearItemId: string
} 

export interface GearState {
  gear: Gear[]
}

export type GearActionTypes = AddGearAction | UpdateGearAction | DeleteGearAction