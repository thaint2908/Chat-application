import auth from './auth';
import { combineReducers } from 'redux';
import { loading } from './loading';
import { error } from './error';
import conversation from './conversation';
import { modal } from './modal';
import { sidebar } from './sidebar';
import { user } from './user';

const rootReducer = combineReducers({
    auth,
    conversation,
    error,
    user,
    sidebar,
    modal,
    loading,
});
export default rootReducer;
