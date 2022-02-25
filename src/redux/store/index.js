import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';

import UserReducer from "../reducers/userReducer"
import LessonsReducer from "../reducers/lessonsReducer"
import CoursesReducer from "../reducers/coursesReducer"
import SelectedCourseReducer from "../reducers/selectedCourseReducer"


// Middleware: Redux Persist Config
const persistConfig = {
    key: 's0luc10n35r00t5',
    storage: AsyncStorage,
};

const reducers = combineReducers({
    users: UserReducer,
    lessons: LessonsReducer,
    courses:CoursesReducer,
    currentCourse:SelectedCourseReducer
})

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, applyMiddleware(createLogger(),thunk));
let persistor = persistStore(store);

export {store, persistor};