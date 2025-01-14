import { InitialStateType } from "./app-reducer";
import {appActions} from "../CommonActions/App";
import {appReducer} from "./index";

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        isLoggedIn: false,
    }
})

test('correct error message should be set', () => {

    const endState = appReducer(startState, appActions.setAppError({error: 'some error'}))

    expect(endState.error).toBe('some error');
})

test('correct status should be set', () => {

    const endState = appReducer(startState, appActions.setAppStatus({status: 'loading'}))

    expect(endState.status).toBe('loading');
})

