import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import diaryReducer from './diaryReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    event: eventReducer,
    diary: diaryReducer,
    error: errorReducer,
    auth: authReducer,
});