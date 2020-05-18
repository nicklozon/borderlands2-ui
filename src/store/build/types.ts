import { Build } from 'borderlands2'

export const CREATE_BUILD = 'CREATE_BUILD'
export const UPDATE_BUILD = 'UPDATE_BUILD'
export const DELETE_BUILD = 'DELETE_BUILD'

export interface CreateBuildAction {
  type: typeof CREATE_BUILD,
  build: Build
}

export interface UpdateBuildAction {
  type: typeof UPDATE_BUILD,
  build: Build
}

export interface DeleteBuildAction {
  type: typeof DELETE_BUILD,
  buildId: string
}

export interface BuildState {
  builds: Build[]
}

export type BuildActionTypes = CreateBuildAction | UpdateBuildAction | DeleteBuildAction