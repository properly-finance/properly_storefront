import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { createBrowserHistory } from 'history'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from "./reducers"
import rootSaga from "./sagas"
import { DEBUG } from "./config"

export const history = createBrowserHistory()
const rootReducer = createRootReducer(history)
const sagaMiddleware = createSagaMiddleware()
const defaultMiddleware = getDefaultMiddleware({
  thunk: false,
  immutableCheck: false
})

const store = configureStore({
  reducer: rootReducer,
  devTools: DEBUG,
  middleware: [ 
    ...defaultMiddleware,
    sagaMiddleware,
    routerMiddleware(history)
  ],
})

sagaMiddleware.run(rootSaga)
// store.dispatch(updateVersion())

export default store

