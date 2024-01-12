import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import {thunk} from "redux-thunk"
import { authReducer } from './Auth/auth.reducer';
import { postReducer } from './Post/post.reducer';
import commentReducer from './Comment/Comment.reducer';
import { followReducer } from './Follow/follow.reducer';
import reelReducer from './Reel/reel.reducer';

const rootReducers=combineReducers({
auth: authReducer,
post:postReducer,
comment:commentReducer,
follow:followReducer,
reel:reelReducer

});

export const  store=legacy_createStore(rootReducers,applyMiddleware(thunk))