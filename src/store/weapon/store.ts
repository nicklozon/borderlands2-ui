import { createStore } from 'redux'
import { weaponReducer } from './reducers'
import { devToolsEnhancer } from 'redux-devtools-extension';

export const WeaponStore = createStore(weaponReducer, devToolsEnhancer({}));
//const store = createStore(weaponReducer, window.STATE_FROM_LOCALSTORAGE)