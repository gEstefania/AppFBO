import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, applyMiddleware, combineReducers} from 'redux';
//import { createLogger } from 'redux-logger'
import { persistStore, persistReducer, createTransform } from 'redux-persist'
//import thunk from 'redux-thunk';
import JSOG from './JSOG'
import UserReducer from "../reducers/userReducer"
import LessonsReducer from "../reducers/lessonsReducer"
import CoursesReducer from "../reducers/coursesReducer"
import SelectedCourseReducer from "../reducers/selectedCourseReducer"
import SelectedArticleReducer from "../reducers/selectedArticleReducer"
import taskReducer from '../reducers/tasksReducer';
import configReducer from '../reducers/configReducer';

const JSOGTransform = createTransform(
    (inboundState, key) => JSOG.encode(inboundState),
    (outboundState, key) => JSOG.decode(outboundState),
)
// Middleware: Redux Persist Config
const persistConfig = {
    key: 's0luc10n35r00t5',
    storage: AsyncStorage,
    transforms: [JSOGTransform]
};

const reducers = combineReducers({
    users: UserReducer,
    lessons: LessonsReducer,
    courses:CoursesReducer,
    currentCourse:SelectedCourseReducer,
    currentArticle: SelectedArticleReducer,
    tasks:taskReducer,
    config:configReducer
})

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer);
let persistor = persistStore(store);

export {store, persistor};