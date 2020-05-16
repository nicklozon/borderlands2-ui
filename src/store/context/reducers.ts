import { ContextActionTypes, ContextState, CREATE_CONTEXT, UPDATE_CONTEXT, DELETE_CONTEXT } from "./types";

const initialState: ContextState = {
  contexts: []
}

export function contextReducer(state = initialState, action: ContextActionTypes): ContextState {
  switch(action.type) {
    case CREATE_CONTEXT:
      let contexts = [...state.contexts, action.context]
      return { contexts }
    case UPDATE_CONTEXT:
      // TODO: build this
      return { contexts: state.contexts }
    case DELETE_CONTEXT:
      return {
        contexts: state.contexts.filter(context => context.name !== action.contextName)
      }
    default:
      return state
  }
}