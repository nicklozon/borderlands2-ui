import { Stat } from "borderlands2";

export const UPDATE_BAR = 'UPDATE_BAR'

export interface UpdateBadassRankingAction {
  type: typeof UPDATE_BAR,
  stats: Stat[]
}

export interface BadassRankingState {
  stats: Stat[]
}

export type BadassRankingActionTypes = UpdateBadassRankingAction