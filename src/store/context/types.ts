import { Context } from 'borderlands2'

export const CREATE_CONTEXT = 'CREATE_CONTEXT'
export const UPDATE_CONTEXT = 'UPDATE_CONTEXT'
export const DELETE_CONTEXT = 'DELETE_CONTEXT'

export interface CreateContextAction {
  type: typeof CREATE_CONTEXT,
  context: Context
}

export interface UpdateContextAction {
  type: typeof UPDATE_CONTEXT,
  context: Context
}

export interface DeleteContextAction {
  type: typeof DELETE_CONTEXT,
  contextName: string
}

export interface ContextState {
  contexts: Context[]
}

export type ContextActionTypes = CreateContextAction | UpdateContextAction | DeleteContextAction