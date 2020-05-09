import { createStore } from 'redux'
import { weaponReducer } from './reducers'
import { devToolsEnhancer } from 'redux-devtools-extension';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('weaponState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}; 

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('weaponState', serializedState);
  } catch {
    // ignore write errors
  }
};

export const WeaponStore = createStore(weaponReducer, devToolsEnhancer(loadState()));
//const store = createStore(weaponReducer, window.STATE_FROM_LOCALSTORAGE)

WeaponStore.subscribe(() => {
  saveState({
    weapons: WeaponStore.getState().weapons
  });
});