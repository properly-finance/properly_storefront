import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootReducer from "./reducers"
import rootSaga from "./sagas"
import { DEBUG } from "./config"

const sagaMiddleware = createSagaMiddleware()
const defaultMiddleware = getDefaultMiddleware({
  thunk: false,
  immutableCheck: false
})

const store = configureStore({
  reducer: rootReducer,
  devTools: DEBUG,
  middleware: [ ...defaultMiddleware, sagaMiddleware ],
})

sagaMiddleware.run(rootSaga)
// store.dispatch(updateVersion())

export default store

