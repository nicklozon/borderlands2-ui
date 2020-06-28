import { createStore, combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension';
import { appReducer } from './app/reducers'
import { weaponReducer } from './weapon/reducers'
import { badassRankingReducer } from './badass_ranking/reducers'
import { buildReducer } from './build/reducers'
import { gearReducer } from './gear/reducers'
import { contextReducer } from './context/reducers'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined;
  }
}; 

const rootReducer = combineReducers({appReducer, weaponReducer, badassRankingReducer, buildReducer, contextReducer, gearReducer})

// I don't know how to make the dev tools work with state loading
export const RootStore = createStore(rootReducer, loadState());
export type RootState = ReturnType<typeof rootReducer>

export const saveState = (state: RootState) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch {
    // ignore write errors
  }
};

RootStore.subscribe(() => {
  saveState(RootStore.getState());
});
