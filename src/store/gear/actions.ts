import { ADD_GEAR, UPDATE_GEAR, DELETE_GEAR, GearActionTypes } from './types'
import { Gear } from 'borderlands2'

export function addGear(gearItem: Gear): GearActionTypes {
  return {
    type: ADD_GEAR,
    gearItem
  }
}

export function updateGear(gearItem: Gear): GearActionTypes {
  return {
    type: UPDATE_GEAR,
    gearItem
  }
}

export function removeGear(gearItemId: string): GearActionTypes {
  return {
    type: DELETE_GEAR,
    gearItemId
  }
}