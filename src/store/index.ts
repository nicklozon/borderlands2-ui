import { createStore, combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension';
import { appReducer } from './app/reducers'
import { weaponReducer } from './weapon/reducers'
import { badassRankingReducer } from './badass_ranking/reducers'
import { buildReducer } from './build/reducers'
import { gearReducer } from './gear/reducers'
import { contextReducer } from './context/reducers'
import { Build, Class, StatType, Skill, HeadSh0t } from 'borderlands2'
import { BuildService } from '../lib/build_service';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }

    let json = JSON.parse(serializedState)

    // Hack to deserialize builds into class instances...
    json.buildReducer.builds = json.buildReducer.builds.map((build: any) => {
      let buildObj = BuildService.parseUrl(build.url)
      buildObj.id = build.id
      buildObj.name = build.name
      return buildObj
    })

    return json
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
    let builds = state.buildReducer.builds.map(build => {
      // need a serialize method
      return {
        id: build.id,
        name: build.name,
        url: BuildService.buildUrl(build)
      }
    })

    localStorage.setItem('state', JSON.stringify({
      badassRankingReducer: state.badassRankingReducer,
      contextReducer: state.contextReducer,
      gearReducer: state.gearReducer,
      weaponReducer: state.weaponReducer,
      buildReducer: { builds }
    }));
  } catch {
    // ignore write errors
  }
};

RootStore.subscribe(() => {
  saveState(RootStore.getState());
});
