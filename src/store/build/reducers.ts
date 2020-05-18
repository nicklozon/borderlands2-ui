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
      // TODO: build this
      return { builds: state.builds }
    case DELETE_BUILD:
        //builds: state.builds.filter(build => build.buildName !== action.buildName)
      return {
        builds: state.builds.filter(build => 'need to be id' !== action.buildName)
      }
    default:
      return state
  }
}