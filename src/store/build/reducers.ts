import { BuildActionTypes, BuildState, CREATE_BUILD, UPDATE_BUILD, DELETE_BUILD } from "./types";

const initialState: BuildState = {
  builds: []
}

export function buildReducer(state = initialState, action: BuildActionTypes): BuildState {
  switch(action.type) {
    case CREATE_BUILD:
      let builds = [...state.builds, action.build]
      return { builds }
    case UPDATE_BUILD:
      return {
        builds: state.builds.map(build => {
          return build.id === action.build.id ? action.build : build
        })
      }
    case DELETE_BUILD:
      return {
        builds: state.builds.filter(build => build.id !== action.buildId)
      }
    default:
      return state
  }
}