import { CREATE_BUILD, DELETE_BUILD, UPDATE_BUILD, BuildActionTypes } from "./types";
import { Build } from "borderlands2";

export function createBuild(build: Build): BuildActionTypes {
  return {
    type: CREATE_BUILD,
    build
  }
} 

export function updateBuild(build: Build): BuildActionTypes {
  return {
    type: UPDATE_BUILD,
    build
  }
} 

export function deleteBuild(buildName: string): BuildActionTypes {
  return {
    type: DELETE_BUILD,
    buildName
  }
} 
