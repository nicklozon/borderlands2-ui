import { BadassRankingActionTypes, UPDATE_BAR } from "./types";
import { Stat } from "borderlands2";

export function updateBadassRAnking(stats: Stat[]): BadassRankingActionTypes {
  return {
    type: UPDATE_BAR,
    stats
  }
}