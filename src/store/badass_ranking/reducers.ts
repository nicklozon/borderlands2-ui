import { BadassRankingState, BadassRankingActionTypes, UPDATE_BAR } from "./types";

const initialState: BadassRankingState = {
  stats: []
}

export function badassRankingReducer(state = initialState, action: BadassRankingActionTypes): BadassRankingState {
  switch(action.type) {
    case UPDATE_BAR:
      return {
        stats: action.stats
      }
    default:
      return state
  }
}