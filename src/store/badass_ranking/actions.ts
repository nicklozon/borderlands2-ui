import { BadassRankingActionTypes, UPDATE_BAR } from "./types";
import { Stat } from "borderlands2";

export function updateBadassRanking(stats: Stat[]): BadassRankingActionTypes {
  return {
    type: UPDATE_BAR,
    stats
  }
}