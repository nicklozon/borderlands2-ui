import { GearActionTypes, GearState, ADD_GEAR, DELETE_GEAR, UPDATE_GEAR } from "./types";

const initialState: GearState = {
  gear: []
}

export function gearReducer(state = initialState, action: GearActionTypes): GearState {
  switch(action.type) {
    case ADD_GEAR:
      return {
        gear: [...state.gear, action.gearItem]
      }
    case UPDATE_GEAR:
      return {
        gear: state.gear.map(gearItem => {
          return gearItem.id === action.gearItem.id ? action.gearItem : gearItem
        })
      }
    case DELETE_GEAR:
      return {
        gear: state.gear.filter(gearItem => gearItem.id !== action.gearItemId)
      }
    default:
      return state
  }
}