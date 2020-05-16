import { CREATE_CONTEXT, DELETE_CONTEXT, UPDATE_CONTEXT, ContextActionTypes } from "./types";
import { Context } from "borderlands2";

export function createContext(context: Context): ContextActionTypes {
  return {
    type: CREATE_CONTEXT,
    context
  }
} 

export function updateContext(context: Context): ContextActionTypes {
  return {
    type: UPDATE_CONTEXT,
    context
  }
} 

export function deleteContext(contextName: string): ContextActionTypes {
  return {
    type: DELETE_CONTEXT,
    contextName
  }
} 
