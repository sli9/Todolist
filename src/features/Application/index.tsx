import * as appSelectors from './selectors'
import {slice} from "./app-reducer";

const appSlise = slice
const appReducer = slice.reducer
const actions = slice.actions

const appActions = {
    ...actions,
}

export {
    appSlise,
    appSelectors,
    appReducer,
    appActions,
}