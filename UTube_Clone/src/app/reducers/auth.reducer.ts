import { createReducer, on } from "@ngrx/store";
import { AuthState } from "../states/auth.state";
import * as AuthActions from "../actions/auth.action"

const inititalState: AuthState = {
    isAuthenticated: false,
    idToken: "",
    error: "",
    _id: "",
}

export const authReducer = createReducer(
    inititalState,

    /////////////////////////////////////////
    on(AuthActions.login, (state, action) => {
        console.log(action.type);
        return state
    }),
    on(AuthActions.loginSuccess, (state, action) => {
        let newState = {
            ...state,
            isAuthenticated: true,
            idToken: action.idToken,
        }
        console.log(action.type);
        return newState;

    }),
    on(AuthActions.loginFailure, (state, action) => {
        let newState = {
            ...state,
            error: action.error
        }
        console.log(newState);
        return newState;
    }),

    ////////////////////////////////////////////////////
    on(AuthActions.getIdToken, (state, action) => {
        console.log(action.type);
        return state;
    }),
    on(AuthActions.getIdTokenSuccess, (state, action) => {
        let newState = {
            ...state,
            isAuthenticated: true,
            idToken: action.idToken,
        }
        console.log(action.idToken);
        return newState;
    }), on(AuthActions.getIdTokenFailure, (state, action) => {
        let newState = {
            ...state,
            error: action.error
        }
        console.log(newState);
        return state;
    }),


    //////////////////////////////////////////////////////   
    on(AuthActions.logout, (state, action) => {
        console.log(action.type);
        return state;
    }),
    on(AuthActions.logoutSuccess, (state, action) => {
        let newState = {
            
            ...state,
            idToken: "",
            isAuthenticated: false,
            _id: ""
        }
        console.log(action.type);
        return newState;
    }),
    on(AuthActions.logoutFailure, (state, action) => {
        let newState = {
            ...state,
            error: action.error
        }
        console.log(action.error);
        return newState;
    }),

    ////////////////////////////////////////////////////////
    on(AuthActions.getUserId, (state, action) => {
        let newState = {

            ...state,
        }
        console.log(action.type);
        return newState;
    }),
    on(AuthActions.getUserIdSuccess, (state, action) => {
        let newState = {
            ...state,
            _id: action._id,
            isAuthenticated: true,
        }
        console.log(action.type);
        return newState;
    }),
    on(AuthActions.getUserIdFailure, (state, action) => {
        let newState = {
            ...state,
            isAuthenticated: false,
            error: action.error
        }
        console.log(action.type);
        return newState;
    }),

   
)